const pdf = require("html-pdf");
let options = {
  format: "Letter",
  orientation: "portrait",
  height: "10.5in",
  width: "8in",
};

const options2 = {
  format: "Letter",
  orientation: "portrait",
  height: "10.5in",
  width: "8in",
  paginationOffset: 1,
  footer: {
    height: "15mm",
    contents: {
      default:
        '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
    },
  },
};
const numWords = require("num-words");
var fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");
const LorryReceipt = require("../models/LorryReceipt");
const LoadingSlip = require("../models/LoadingSlip");
const Customer = require("../models/Customer");
const MoneyTransfer = require("../models/MoneyTransfer");
const PettyTransaction = require("../models/PettyTransaction");
const Bill = require("../models/Bill");
const Vehicle = require("../models/Vehicle");
const SuppliersBill = require("../models/SuppliersBill");
const Quotation = require("../models/Quotation");
const sendEmail = require("../controller/email");
const { translator } = require("./openAI");

const getLorryReceipts = (req, res, next) => {
  const query = { active: true };

  if (req.body.branch) {
    query.branch = req.body.branch;
  }

  LorryReceipt.find(query)
    .sort("-createdAt")
    .exec((lrError, lorryReceipts) => {
      if (lrError) {
        return res.status(200).json({
          message: "Error fetching lorry receipts!",
        });
      } else {
        res.json(lorryReceipts);
      }
    });
};

const getLorryReceiptsForLS = (req, res, next) => {
  const query = { active: true, status: 0 };

  if (req.body.branch) {
    query.branch = req.body.branch;
  }
  const limit = 50;
  const start = (req.body.page - 1) * limit;
  const end = req.body.page * limit;
  LorryReceipt.find(query)
    .sort("-createdAt")
    .exec((lrError, lorryReceipts) => {
      if (lrError) {
        return res.status(200).json({
          message: "Error fetching lorry receipts!",
        });
      } else {
        const records = lorryReceipts.slice(start, end);
        return res.json({
          lorryReceipts: records,
          isLastPage: lorryReceipts?.length <= end,
        });
      }
    });
};

const getLorryReceiptsWithCount = (req, res, next) => {
  if (
    !req.body.branch ||
    !req.body.pagination.page ||
    !req.body.pagination.limit
  ) {
    return res
      .status(200)
      .json({ message: "Branch ID & pagination is required!" });
  }

  const limit = req.body.pagination.limit || 100;
  const start = (req.body.pagination.page - 1) * limit;
  const end = req.body.pagination.page * limit;

  LorryReceipt.find({ branch: req.body.branch, active: true })
    .sort("-createdAt")
    .exec((lrError, lorryReceipts) => {
      if (lrError) {
        return res.status(200).json({
          message: "Error fetching lorry receipts!",
        });
      } else {
        res.json({
          lorryReceipts: lorryReceipts.slice(start, end),
          count: lorryReceipts?.length,
          isLastPage: false,
        });
      }
    });
};

const getLRAckWithCount = (req, res, next) => {
  if (
    !req.body.branch ||
    !req.body.pagination.page ||
    !req.body.pagination.limit
  ) {
    return res
      .status(200)
      .json({ message: "Branch ID & pagination is required!" });
  }

  const limit = req.body.pagination.limit || 100;
  const start = (req.body.pagination.page - 1) * limit;
  const end = req.body.pagination.page * limit;

  const query = {
    active: true,
    branch: req.body.branch,
    status: { $ne: 0 },
  };

  if (req.body.query.startDate) {
    const date = new Date(req.body.query.startDate);
    const updatedDate = new Date(date).setDate(date?.getDate() + 1);
    const newDate = new Date(updatedDate)?.setUTCHours(0, 0, 0, 000);
    query.date = {
      ...query.date,
      $gte: new Date(newDate)?.toISOString(),
    };
  }
  if (req.body.query.endDate) {
    const date = new Date(req.body.query.endDate);
    const updatedDate = new Date(date).setDate(date?.getDate() + 1);
    const newDate = new Date(updatedDate).setUTCHours(23, 59, 59, 999);
    query.date = {
      ...query.date,
      $lte: new Date(newDate)?.toISOString(),
    };
  }

  if (req.body.query.type === "delivered") {
    query.deliveryDate = { $exists: true, $ne: null };
  }
  if (req.body.query.type === "undelivered") {
    query.deliveryDate = null;
  }

  LorryReceipt.find(query)
    // .limit(limit)
    // .skip(skip)
    .sort("-createdAt")
    .exec((lrError, lorryReceipts) => {
      if (lrError) {
        return res.status(200).json({
          message: "Error fetching lorry receipts!",
        });
      } else {
        return res.json({
          lorryReceipts: lorryReceipts.slice(start, end),
          count: lorryReceipts?.length,
          isLastPage: false,
        });
      }
    });
};

const getAllLorryReceiptsWithCount = (req, res, next) => {
  if (!req.body.pagination.page || !req.body.pagination.limit) {
    return res.status(200).json({ message: "Pagination inputs not provided!" });
  }

  const limit = req.body.pagination.limit || 100;
  const start = (req.body.pagination.page - 1) * limit;
  const end = req.body.pagination.page * limit;

  LorryReceipt.find({ active: true })
    // .limit(limit)
    // .skip(skip)
    .sort("-createdAt")
    .exec((lrError, lorryReceipts) => {
      if (lrError) {
        return res.status(200).json({
          message: "Error fetching lorry receipts!",
        });
      } else {
        const isLastPage = count - (skip + limit) <= 0;
        res.json({
          lorryReceipts: lorryReceipts.slice(start, end),
          count: lorryReceipts?.length,
          isLastPage: false,
        });
      }
    });
};

const getLorryReceiptsByConsignor = (req, res, next) => {
  if (!req.body.branch) {
    return res.status(200).json({ message: "Branch ID is required!" });
  }

  if (!req.body.consignor) {
    return res.status(200).json({ message: "Consignor ID is required!" });
  }

  const query = {
    branch: req.body.branch,
    consignor: req.body.consignor,
    active: true,
  };

  if (req.body.from) {
    const date = new Date(req.body.from);
    const updatedDate = new Date(date).setDate(date?.getDate() + 1);
    const newDate = new Date(updatedDate)?.setUTCHours(0, 0, 0, 000);
    query.date = {
      $gte: new Date(newDate)?.toISOString(),
    };
  }
  if (req.body.to) {
    const date = new Date(req.body.to);
    const updatedDate = new Date(date).setDate(date?.getDate() + 1);
    const newDate = new Date(updatedDate).setUTCHours(23, 59, 59, 999);
    query.date = {
      ...query.date,
      $lte: new Date(newDate)?.toISOString(),
    };
  }

  LorryReceipt.find(query)
    .limit(1000)
    .exec((error, lorryReceipts) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching lorry receipts!",
        });
      } else {
        res.json(lorryReceipts);
      }
    });
};

const addLorryReceipt = async (req, res, next) => {
  const number = 1;
  const abbreviation = req.body.branchCode?.trim();
  LorryReceipt.findOne(
    { lrNo: { $regex: abbreviation } },
    {},
    { sort: { createdAt: -1 } },
    async function (err, foundLR) {
      let formattedLR;
      if (err) {
        return res.status(200).json({ message: err.message });
      }
      if (foundLR) {
        // const currLRInitial = req.body.lrNo[0];
        // const lastLRNo = +foundLR.lrNo.replace(/\D/g, "");
        // const newLRNo = pad(lastLRNo + 1, 6);
        // formattedLR = currLRInitial + "-" + newLRNo;

        const splitedNo = foundLR.lrNo?.split("-");
        const nu = splitedNo[splitedNo?.length - 1];
        const numLeadingZeros = parseInt(nu?.replace(/[^0-9]/g, ""));
        formattedLR = `${abbreviation}-${(numLeadingZeros + 1 + "")?.padStart(
          6,
          "0"
        )}`;
      } else {
        formattedLR = `${abbreviation}-${(number + "")?.padStart(6, "0")}`;
      }

      const foundConsignor = await Customer.findOne({
        name: req.body.consignorName?.toUpperCase()?.trim?.(),
      });

      const foundConsignee = await Customer.findOne({
        name: req.body.consigneeName?.toUpperCase()?.trim?.(),
      });

      if (foundConsignor && foundConsignee) {
        const lorryReceipt = new LorryReceipt({
          branch: req.body.branch,
          lrNo: formattedLR?.trim?.(),
          date: req.body.date,
          invoiceNo: req.body.invoiceNo,
          eWayBillNo: req.body.eWayBillNo,
          foNum: req.body.foNum,
          consignor: req.body.consignor,
          consignorName: req.body.consignorName?.trim?.(),
          consignorAddress: req.body.consignorAddress?.trim?.(),
          consignorPhone: req.body.consignorPhone,
          consignorEmail: req.body.consignorEmail?.trim?.(),
          from: req.body.from,
          consignee: req.body.consignee,
          consigneeName: req.body.consigneeName?.trim?.(),
          consigneeAddress: req.body.consigneeAddress?.trim?.(),
          consigneePhone: req.body.consigneePhone,
          consigneeEmail: req.body.consigneeEmail?.trim?.(),
          to: req.body.to,
          materialCost: req.body.materialCost,
          deliveryType: req.body.deliveryType,
          deliveryInDays: req.body.deliveryInDays,
          serviceTaxBy: req.body.serviceTaxBy,
          payType: req.body.payType,
          toBilled: req.body.toBilled,
          collectAt: req.body.collectAt,
          payMode: req.body.payMode,
          bankName: req.body.bankName,
          chequeNo: req.body.chequeNo,
          chequeDate: req.body.chequeDate,
          remark: req.body.remark,
          transactions: req.body.transactions,
          totalFreight: req.body.totalFreight,
          hamali: req.body.hamali,
          deliveryCharges: req.body.deliveryCharges,
          lrCharges: req.body.lrCharges,
          total: req.body.total,
          unloadDate: req.body.unloadDate,
          deliveryDate: req.body.deliveryDate,
          deliveredTo: req.body.deliveredTo,
          close: req.body.close,
          createdBy: req.body.createdBy,
        });
        LorryReceipt.create(lorryReceipt, (error, data) => {
          if (error) {
            if (error.code === 11000) {
              return res.status(200).json({
                message: `LorryReceipt with LR no (${lorryReceipt.lrNo}) already exist!`,
              });
            }
            return res.status(200).json({ message: error.message });
          } else {
            // TransactionPrefix.findOneAndUpdate(
            //   { name: "LR" },
            //   { $inc: { current: 1 } },
            //   { new: true }
            // ).exec();
            data.user = req.body.user;
            generateLrPdf(data, req, res, req.body.isSaveAndPrint, false);
          }
        });
      }

      if (!foundConsignor && !foundConsignee) {
        try {
          const consignor = new Customer({
            name: req.body.consignorName?.toUpperCase(),
            address: req.body.consignorAddress?.trim?.(),
            city: req.body.from?.trim?.(),
            telephone: req.body.consignorPhone,
            createdBy: req.body.createdBy,
            email: req.body.consignorEmail,
          });

          const consignee = new Customer({
            name: req.body.consigneeName?.toUpperCase(),
            address: req.body.consigneeAddress?.trim?.(),
            city: req.body.to?.trim?.(),
            telephone: req.body.consigneePhone,
            createdBy: req.body.createdBy,
            email: req.body.consigneeEmail,
          });

          const createdConsignor = await Customer.create(consignor);
          const createdConsignee = await Customer.create(consignee);
          if (createdConsignor && createdConsignee) {
            const lorryReceipt = new LorryReceipt({
              branch: req.body.branch,
              lrNo: formattedLR?.trim?.(),
              date: req.body.date,
              invoiceNo: req.body.invoiceNo?.trim?.(),
              eWayBillNo: req.body.eWayBillNo?.trim?.(),
              foNum: req.body.foNum,
              consignor: createdConsignor._id,
              consignorName: createdConsignor.name?.trim?.(),
              consignorAddress: createdConsignor.address?.trim?.(),
              consignorPhone: createdConsignor.telephone,
              consignorEmail: createdConsignor.email?.trim?.(),
              from: req.body.from,
              consignee: createdConsignee._id,
              consigneeName: createdConsignee.name?.trim?.(),
              consigneeAddress: createdConsignee.address?.trim?.(),
              consigneePhone: createdConsignee.telephone,
              consigneeEmail: createdConsignee.email?.trim?.(),
              to: req.body.to,
              materialCost: req.body.materialCost,
              deliveryType: req.body.deliveryType,
              deliveryInDays: req.body.deliveryInDays,
              serviceTaxBy: req.body.serviceTaxBy,
              payType: req.body.payType,
              toBilled: req.body.toBilled,
              collectAt: req.body.collectAt,
              payMode: req.body.payMode,
              bankName: req.body.bankName?.trim?.(),
              chequeNo: req.body.chequeNo,
              chequeDate: req.body.chequeDate,
              remark: req.body.remark?.trim?.(),
              transactions: req.body.transactions,
              totalFreight: req.body.totalFreight,
              hamali: req.body.hamali,
              deliveryCharges: req.body.deliveryCharges,
              lrCharges: req.body.lrCharges,
              total: req.body.total,
              unloadDate: req.body.unloadDate,
              deliveryDate: req.body.deliveryDate,
              deliveredTo: req.body.deliveredTo,
              close: req.body.close,
              createdBy: req.body.createdBy,
            });
            LorryReceipt.create(lorryReceipt, (error, data) => {
              if (error) {
                if (error.code === 11000) {
                  return res.status(200).json({
                    message: `LorryReceipt with LR no (${lorryReceipt.lrNo}) already exist!`,
                  });
                }
                return res.status(200).json({ message: error.message });
              } else {
                // TransactionPrefix.findOneAndUpdate(
                //   { name: "LR" },
                //   { $inc: { current: 1 } },
                //   { new: true }
                // ).exec();
                data.user = req.body.user;
                generateLrPdf(data, req, res, req.body.isSaveAndPrint, false);
              }
            });
          }
        } catch (e) {
          return res.status(200).json({ message: e.message });
        }
      }

      if (foundConsignor && !foundConsignee) {
        try {
          const consignee = new Customer({
            name: req.body.consigneeName?.toUpperCase(),
            address: req.body.consigneeAddress?.trim?.(),
            city: req.body.to?.trim?.(),
            telephone: req.body.consigneePhone,
            createdBy: req.body.createdBy,
            email: req.body.consigneeEmail?.trim?.(),
          });

          const createdConsignee = await Customer.create(consignee);
          if (createdConsignee) {
            const lorryReceipt = new LorryReceipt({
              branch: req.body.branch,
              lrNo: formattedLR?.trim?.(),
              date: req.body.date,
              invoiceNo: req.body.invoiceNo,
              eWayBillNo: req.body.eWayBillNo,
              foNum: req.body.foNum,
              consignor: req.body.consignor,
              consignorName: req.body.consignorName?.trim?.(),
              consignorAddress: req.body.consignorAddress?.trim?.(),
              consignorPhone: req.body.consignorPhone,
              consignorEmail: req.body.consignorEmail?.trim?.(),
              from: req.body.from,
              consignee: createdConsignee._id,
              consigneeName: createdConsignee.name?.trim?.(),
              consigneeAddress: createdConsignee.address?.trim?.(),
              consigneePhone: createdConsignee.telephone,
              consigneeEmail: createdConsignee.email?.trim?.(),
              to: req.body.to,
              materialCost: req.body.materialCost,
              deliveryType: req.body.deliveryType,
              deliveryInDays: req.body.deliveryInDays,
              serviceTaxBy: req.body.serviceTaxBy,
              payType: req.body.payType,
              toBilled: req.body.toBilled,
              collectAt: req.body.collectAt,
              payMode: req.body.payMode,
              bankName: req.body.bankName?.trim?.(),
              chequeNo: req.body.chequeNo,
              chequeDate: req.body.chequeDate,
              remark: req.body.remark,
              transactions: req.body.transactions,
              totalFreight: req.body.totalFreight,
              hamali: req.body.hamali,
              deliveryCharges: req.body.deliveryCharges,
              lrCharges: req.body.lrCharges,
              total: req.body.total,
              unloadDate: req.body.unloadDate,
              deliveryDate: req.body.deliveryDate,
              deliveredTo: req.body.deliveredTo,
              close: req.body.close,
              createdBy: req.body.createdBy,
            });
            LorryReceipt.create(lorryReceipt, (error, data) => {
              if (error) {
                if (error.code === 11000) {
                  return res.status(200).json({
                    message: `LorryReceipt with LR no (${lorryReceipt.lrNo}) already exist!`,
                  });
                }
                return res.status(200).json({ message: error.message });
              } else {
                // TransactionPrefix.findOneAndUpdate(
                //   { name: "LR" },
                //   { $inc: { current: 1 } },
                //   { new: true }
                // ).exec();
                data.user = req.body.user;

                generateLrPdf(data, req, res, req.body.isSaveAndPrint, false);
              }
            });
          }
        } catch (e) {
          return res.status(200).json({ message: e.message });
        }
      }

      if (!foundConsignor && foundConsignee) {
        try {
          const consignor = new Customer({
            name: req.body.consignorName?.toUpperCase(),
            address: req.body.consignorAddress?.trim?.(),
            city: req.body.from?.trim?.(),
            telephone: req.body.consignorPhone,
            createdBy: req.body.createdBy,
            email: req.body.consignorEmail,
          });

          const createdConsignor = await Customer.create(consignor);
          if (createdConsignor) {
            const lorryReceipt = new LorryReceipt({
              branch: req.body.branch,
              lrNo: formattedLR,
              date: req.body.date,
              invoiceNo: req.body.invoiceNo,
              eWayBillNo: req.body.eWayBillNo,
              foNum: req.body.foNum,
              consignor: createdConsignor._id,
              consignorName: createdConsignor.name,
              consignorAddress: createdConsignor.address,
              consignorPhone: createdConsignor.telephone,
              consignorEmail: createdConsignor.email?.trim?.(),
              from: req.body.from,
              consignee: req.body.consignee,
              consigneeName: req.body.consigneeName,
              consigneeAddress: req.body.consigneeAddress,
              consigneePhone: req.body.consigneePhone,
              consigneeEmail: req.body.consigneeEmail?.trim?.(),
              to: req.body.to,
              materialCost: req.body.materialCost,
              deliveryType: req.body.deliveryType,
              deliveryInDays: req.body.deliveryInDays,
              serviceTaxBy: req.body.serviceTaxBy,
              payType: req.body.payType,
              toBilled: req.body.toBilled,
              collectAt: req.body.collectAt,
              payMode: req.body.payMode,
              bankName: req.body.bankName,
              chequeNo: req.body.chequeNo,
              chequeDate: req.body.chequeDate,
              remark: req.body.remark,
              transactions: req.body.transactions,
              totalFreight: req.body.totalFreight,
              hamali: req.body.hamali,
              deliveryCharges: req.body.deliveryCharges,
              lrCharges: req.body.lrCharges,
              total: req.body.total,
              unloadDate: req.body.unloadDate,
              deliveryDate: req.body.deliveryDate,
              deliveredTo: req.body.deliveredTo,
              close: req.body.close,
              createdBy: req.body.createdBy,
            });
            LorryReceipt.create(lorryReceipt, (error, data) => {
              if (error) {
                if (error.code === 11000) {
                  return res.status(200).json({
                    message: `LorryReceipt with LR no (${lorryReceipt.lrNo}) already exist!`,
                  });
                }
                return res.status(200).json({ message: error.message });
              } else {
                // TransactionPrefix.findOneAndUpdate(
                //   { name: "LR" },
                //   { $inc: { current: 1 } },
                //   { new: true }
                // );
                data.user = req.body.user;

                generateLrPdf(data, req, res, req.body.isSaveAndPrint, false);
              }
            });
          }
        } catch (e) {
          return res.status(200).json({ message: e.message });
        }
      }
    }
  );
};

const removeLorryReceipt = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Lorry receipt ID is required!" });
  }
  const query = {
    lrList: {
      $elemMatch: {
        _id: req.params.id,
      },
    },
    active: true,
  };
  LoadingSlip.findOne(query).exec((lrError, found) => {
    if (lrError) {
      return res.status(200).json({
        message: "Error fetching lorry receipts!",
      });
    } else {
      if (found) {
        return res.status(200).json({
          message: `This LR is used in Challan ${found.lsNo}. First, delete the challan.`,
        });
      }

      LorryReceipt.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
          res.status(200).json({ message: error.message });
        } else {
          res.json({ id: data._id });
        }
      });
    }
  });
};

const generateLrPdf = (data, req, res, isSend, isUpdate, isView) => {
  if (!isSend && !isView) {
    return res.json(data);
  }
  let LRData;
  let fetchedConsignor;
  let fetchedConsignee;
  LRData = JSON.parse(JSON.stringify(data));
  LRData.date = getFormattedDate(data.date);
  LRData.LRNo = LRData.lrNo;
  const isWithoutAmount = req.body.isWithoutAmount || false;

  Customer.findById(LRData.consignee, (consigneeError, consignee) => {
    if (consigneeError) {
      return res.status(200).json({ message: consigneeError.message });
    }
    fetchedConsignee = consignee;
    Customer.findById(LRData.consignor, async (consignorError, consignor) => {
      if (consignorError) {
        return res.status(200).json({ message: consignorError.message });
      }

      fetchedConsignor = consignor;
      const name = await translator(consignee.name);
      const to = await translator(LRData.to);
      const from = await translator(LRData.from);
      const conName = await translator(consignor.name);
      if (name) {
        fetchedConsignee.name = name;
      }
      if (to) {
        LRData.to = to;
      }
      if (from) {
        LRData.from = from;
      }
      if (conName) {
        fetchedConsignor.name = conName;
      }
      let totalArticles = 0;
      let totalWeight = 0;
      let totalChargeWeight = 0;
      LRData.total = LRData.total - LRData.lrCharges + 10;
      LRData.billtyCharges = isWithoutAmount ? "-" : "10.00";

      for (let index = 0; index < LRData.transactions.length; index++) {
        const tr = LRData.transactions[index];
        if (tr.articleNo) {
          totalArticles = totalArticles + tr.articleNo;
        }
        // const article = await translator(tr.article);
        // if (article) {
        //   tr.article = article;
        // }
        if (tr.weight) {
          totalWeight = totalWeight + tr.weight;
        }
        if (tr.chargeWeight) {
          totalChargeWeight = totalChargeWeight + tr.chargeWeight;
        }
        tr.freight = tr.freight?.toFixed(2);
        tr.rate = tr.rate?.toFixed(2);
        tr.srNo = index + 1;
      }
      LRData.totalFreight = isWithoutAmount
        ? "   -   "
        : LRData.totalFreight?.toFixed(2);
      LRData.deliveryCharges = isWithoutAmount
        ? "   -   "
        : LRData.deliveryCharges?.toFixed(2);
      LRData.lrCharges = isWithoutAmount ? "   -   " : `0.00`;
      LRData.hamali = isWithoutAmount ? "   -   " : LRData.hamali?.toFixed(2);
      LRData.total = isWithoutAmount ? "   -   " : LRData.total?.toFixed(2);

      const logo = base64_encode(
        path.join(__dirname, "../public/images/logo.png")
      );
      const laxmi = base64_encode(
        path.join(__dirname, "../public/images/laxmi.jpeg")
      );
      const checked = base64_encode(
        path.join(__dirname, "../public/images/checked.png")
      );
      const unchecked = base64_encode(
        path.join(__dirname, "../public/images/unchecked.png")
      );
      const templatePath =
        path.join(__dirname, "../bills/") + "LorryReceipt-Marathi.html";
      const isMultiEway = LRData.eWayBillNo?.length > 90,
        isMultiInvoice = LRData.invoiceNo?.length > 49,
        isOsWindows = process.platform === "win32";
      res.render(
        templatePath,
        {
          info: {
            lr: LRData,
            lrNo: LRData.LRNo || "-",
            isTBB: LRData.payType && LRData.payType?.toLowerCase() === "tbb",
            isToPay:
              LRData.payType && LRData.payType?.toLowerCase() === "topay",
            isPaid: LRData.payType && LRData.payType?.toLowerCase() === "paid",
            consignee: fetchedConsignee,
            consignor: fetchedConsignor,
            totalArticles: totalArticles,
            totalWeight: totalWeight,
            totalChargeWeight: totalChargeWeight,
            logo: logo,
            laxmi: laxmi,
            checked: checked,
            unchecked: unchecked,
            user: req.body.user,
          },
        },
        (err, HTML) => {
          const finalPath = path.join(__dirname, "../bills/lorryReceipts/");
          const fileName = LRData.lrNo;
          let htmlRaw = HTML;
          if (isMultiEway && isMultiInvoice) {
            // htmlRaw = htmlRaw.replace("0.55", "0.52");
            options = {
              format: "Letter",
              orientation: "portrait",
              height: "10.6in",
              width: "8in",
            };
          } else if (
            isMultiInvoice ||
            isMultiEway ||
            LRData.transactions.length > 5
          ) {
            // htmlRaw = htmlRaw.replace("0.55", "0.53");
            options = {
              format: "Letter",
              orientation: "portrait",
              height: "10.6in",
              width: "8in",
            };
          }

          pdf.create(htmlRaw, options).toBuffer((buffErr, buffer) => {
            if (buffErr) {
              return res.status(200).json({ message: buffErr.message });
            }
            const base64String = buffer.toString("base64");
            if (isSend && data.consigneeEmail?.trim?.()) {
              sendEmail(
                data.consigneeEmail?.trim?.(),
                base64String,
                `${fileName}.pdf`,
                `JSM - Lorry receipt no. ${data.lrNo}`,
                `JSM - Lorry receipt no. ${data.lrNo}`,
                `<p><b>Hello</b></p><p>Please check ${
                  isUpdate ? "updated" : "created"
                } lorry receipt</p>`
              );
            }
            if (isSend && data.consignorEmail?.trim?.()) {
              sendEmail(
                data.consignorEmail?.trim?.(),
                base64String,
                `${fileName}.pdf`,
                `JSM - Lorry receipt no. ${data.lrNo}`,
                `JSM - Lorry receipt no. ${data.lrNo}`,
                `<p><b>Hello</b></p><p>Please check ${
                  isUpdate ? "updated" : "created"
                } lorry receipt</p>`
              );
            }
            if (req.body.email && req.body.email?.trim() !== "") {
              sendEmail(
                req.body.email,
                base64String,
                `${fileName}.pdf`,
                `JSM - Lorry receipt no. ${fileName}`,
                `JSM - Lorry receipt no. ${fileName}`,
                `<p><b>Hello</b></p><p>Please find attached lorry receipt</p>`
              )
                .then((response) => {
                  return res.json({ success: true });
                })
                .catch((err) => {
                  return res.status(200).json({ message: err });
                });
            } else {
              return res.json({
                file: base64String,
                _id: data._id,
                lrNo: data.lrNo,
              });
            }
          });
        }
      );
    });
  });
};

const viewLorryReceipt = (req, res, next) => {
  LorryReceipt.findById(req.params.id, (error, data) => {
    if (error) {
      return res.status(200).json({ message: error.message });
    } else {
      generateLrPdf(data, req, res, false, false, true);
    }
  });
};

const getLorryReceipt = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Lorry receipt ID is required!" });
  }
  LorryReceipt.findById(req.params.id, (error, data) => {
    if (error) {
      return res.status(200).json({ message: error.message });
    }
    res.send(data);
  });
};

const updateLorryReceipt = async (req, res, next) => {
  const _id = req.body._id;

  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Lorry receipt ID is required!" });
  }
  const foundConsignor = await Customer.findOne({
    name: req.body.consignorName?.toUpperCase()?.trim?.(),
  });

  const foundConsignee = await Customer.findOne({
    name: req.body.consigneeName?.toUpperCase()?.trim?.(),
  });

  let model = {
    branch: req.body.branch,
    lrNo: req.body.lrNo?.trim?.(),
    date: req.body.date,
    invoiceNo: req.body.invoiceNo?.trim?.(),
    eWayBillNo: req.body.eWayBillNo?.trim?.(),
    foNum: req.body.foNum?.trim?.(),
    consignor: req.body.consignor?.trim?.(),
    consignorName: req.body.consignorName?.trim?.(),
    consignorAddress: req.body.consignorAddress?.trim?.(),
    consignorPhone: req.body.consignorPhone?.trim?.(),
    consignorEmail: req.body.consignorEmail?.trim?.(),
    from: req.body.from?.trim?.(),
    consignee: req.body.consignee?.trim?.(),
    consigneeName: req.body.consigneeName?.trim?.(),
    consigneeAddress: req.body.consigneeAddress?.trim?.(),
    consigneePhone: req.body.consigneePhone?.trim?.(),
    consigneeEmail: req.body.consigneeEmail?.trim?.(),
    to: req.body.to?.trim?.(),
    materialCost: req.body.materialCost?.trim?.(),
    deliveryType: req.body.deliveryType?.trim?.(),
    deliveryInDays: req.body.deliveryInDays?.trim?.(),
    serviceTaxBy: req.body.serviceTaxBy?.trim?.(),
    payType: req.body.payType,
    toBilled: req.body.toBilled,
    collectAt: req.body.collectAt,
    payMode: req.body.payMode,
    bankName: req.body.bankName?.trim?.(),
    chequeNo: req.body.chequeNo,
    chequeDate: req.body.chequeDate,
    remark: req.body.remark,
    transactions: req.body.transactions,
    totalFreight: req.body.totalFreight,
    hamali: req.body.hamali,
    deliveryCharges: req.body.deliveryCharges,
    lrCharges: req.body.lrCharges,
    total: req.body.total,
    unloadDate: req.body.unloadDate,
    deliveryDate: req.body.deliveryDate,
    deliveredTo: req.body.deliveredTo,
    close: req.body.close,
    updatedBy: req.body.updatedBy,
  };

  const updateLorryReceipt = (_model) => {
    LorryReceipt.findByIdAndUpdate(
      _id,
      {
        $set: _model,
      },
      { new: true },
      (error, data) => {
        if (error) {
          return res.status(200).json({ message: error.message });
        } else {
          data.user = req.body.user;
          generateLrPdf(data, req, res, req.body.isSaveAndPrint, true);
        }
      }
    );
  };

  try {
    const query = {
      lrList: {
        $elemMatch: {
          _id: req.params.id,
        },
      },
      active: true,
    };
    LoadingSlip.findOne(query).exec(async (lrError, found) => {
      if (lrError) {
        return res.status(200).json({
          message: "Error fetching lorry receipts!",
        });
      } else {
        if (found) {
          return res.status(200).json({
            message: `This LR is used in Challan ${found.lsNo}. First, delete the challan.`,
          });
        }
        if (foundConsignor && foundConsignee) {
          updateLorryReceipt(model);
        } else {
          if (!foundConsignor && !foundConsignee) {
            try {
              const consignor = new Customer({
                name: req.body.consignorName?.toUpperCase(),
                address: req.body.consignorAddress?.trim?.(),
                city: req.body.from?.trim?.(),
                telephone: req.body.consignorPhone,
                createdBy: req.body.createdBy,
                email: req.body.consignorEmail,
              });

              const consignee = new Customer({
                name: req.body.consigneeName?.toUpperCase(),
                address: req.body.consigneeAddress?.trim?.(),
                city: req.body.to?.trim?.(),
                telephone: req.body.consigneePhone,
                createdBy: req.body.createdBy,
                email: req.body.consigneeEmail,
              });

              const createdConsignor = await Customer.create(consignor);
              const createdConsignee = await Customer.create(consignee);
              if (createdConsignor && createdConsignee) {
                updateLorryReceipt({
                  ...model,
                  consignor: createdConsignor._id,
                  consignee: createdConsignee._id,
                  consignorName: createdConsignor.name,
                  consigneeName: createdConsignee.name,
                });
              }
            } catch (e) {
              return res.status(200).json({ message: e.message });
            }
          }

          if (foundConsignor && !foundConsignee) {
            try {
              const consignee = new Customer({
                name: req.body.consigneeName?.toUpperCase(),
                address: req.body.consigneeAddress?.trim?.(),
                city: req.body.to?.trim?.(),
                telephone: req.body.consigneePhone,
                createdBy: req.body.createdBy,
                email: req.body.consigneeEmail,
              });

              const createdConsignee = await Customer.create(consignee);
              if (createdConsignee) {
                updateLorryReceipt({
                  ...model,
                  consignee: createdConsignee._id,
                  consigneeName: createdConsignee.name,
                });
              }
            } catch (e) {
              return res.status(200).json({ message: e.message });
            }
          }
          if (!foundConsignor && foundConsignee) {
            try {
              const consignor = new Customer({
                name: req.body.consignorName?.toUpperCase(),
                address: req.body.consignorAddress?.trim?.(),
                city: req.body.from?.trim?.(),
                telephone: req.body.consignorPhone,
                createdBy: req.body.createdBy,
                email: req.body.consignorEmail,
              });

              const createdConsignor = await Customer.create(consignor);
              if (createdConsignor) {
                updateLorryReceipt({
                  ...model,
                  consignor: createdConsignor._id,
                  consignorName: createdConsignor.name,
                });
              }
            } catch (e) {
              return res.status(200).json({ message: e.message });
            }
          }
        }
      }
    });
  } catch (e) {
    return res.status(200).json({ message: e.message });
  }
};

const updateLorryReceiptAck = (req, res, next) => {
  const _id = req.params.id || req.body._id;

  if (!_id) {
    return res.status(200).json({ message: "Lorry receipt ID is required!" });
  }

  if (!req.body.deliveryDate) {
    return res.status(200).json({ message: "Delivery date is required!" });
  }

  LorryReceipt.findByIdAndUpdate(
    _id,
    {
      $set: {
        deliveryDate: req.body.deliveryDate,
        updatedBy: req.body.updatedBy,
      },
    },
    { new: true },
    (error, data) => {
      if (error) {
        res.status(200).json({ message: error.message });
      } else {
        res.json(data);
      }
    }
  );
};

const removeLorryReceiptAck = (req, res) => {
  const _id = req.params.id;

  if (!_id) {
    return res.status(200).json({ message: "Lorry receipt ID is required!" });
  }

  LorryReceipt.findById(_id, (foundLRErr, foundLRData) => {
    if (foundLRErr) {
      return res.status(200).json({ message: foundLRErr.message });
    }

    if (foundLRData && foundLRData.ack) {
      const filePath = foundLRData.ack;
      const parts = filePath.split("/");
      const fileName = parts[parts.length - 1];
      const fileToRemove = path.join(
        __dirname,
        "../acknowledgement/",
        fileName
      );
      fs.unlinkSync(fileToRemove);

      LorryReceipt.findByIdAndUpdate(
        _id,
        {
          $set: {
            ack: "",
            updatedBy: req.body.updatedBy,
          },
        },
        { new: true },
        (error, data) => {
          if (error) {
            res.status(200).json({ message: error.message });
          } else {
            res.json(data);
          }
        }
      );
    }
    if (!foundLRData) {
      return res.status(200).json({ message: "Lorry receipt not found!" });
    }
  });
};

const getLoadingSlips = (req, res, next) => {
  if (
    !req.body.branch &&
    req.userData &&
    req.userData.type &&
    req.userData.type?.toLowerCase() !== "superadmin"
  ) {
    return res.status(200).json({ message: "Branch ID is required!" });
  }
  let query = { active: true };
  if (
    req.userData &&
    req.userData.type &&
    req.userData.type?.toLowerCase() !== "superadmin"
  ) {
    query.branch = req.body.branch;
  }

  const limit = req.body.pagination.limit || 100;
  const start = (req.body.pagination.page - 1) * limit;
  const end = req.body.pagination.page * limit;

  LoadingSlip.find(query)
    .sort("-createdAt")
    .exec((error, loadingSlips) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching loading slips!",
        });
      } else {
        res.json({
          loadingSlips: loadingSlips.slice(start, end),
          count: loadingSlips?.length,
          isLastPage: false,
        });
      }
    });
};

const getLoadingSlipsById = (req, res, next) => {
  LoadingSlip.find(
    {
      _id: { $in: req.body.lsList },
      active: true,
    },
    (error, loadingSlips) => {
      if (error) {
        res.send(error);
      }
      res.send(loadingSlips);
    }
  );
};

const addLoadingSlip = (req, res, next) => {
  const loadingSlip = new LoadingSlip({
    branch: req.body.branch,
    date: req.body.date,
    vehicleNo: req.body.vehicleNo,
    vehicleOwner: req.body.vehicleOwner,
    vehicleOwnerAddress: req.body.vehicleOwnerAddress,
    vehicleOwnerPhone: req.body.vehicleOwnerPhone,
    driverName: req.body.driverName,
    licenseNo: req.body.licenseNo,
    phone: req.body.phone,
    from: req.body.from,
    fromName: req.body.fromName,
    to: req.body.to,
    toName: req.body.toName,
    lrList: req.body.lrList,
    totalFreight: req.body.totalFreight,
    rent: req.body.rent,
    advance: req.body.advance,
    totalPayable: req.body.totalPayable,
    totalWeight: req.body.totalWeight,
    currentTime: req.body.currentTime,
    reachTime: req.body.reachTime,
    paybleAt: req.body.paybleAt,
    remark: req.body.remark,
    isLocalMemo: req.body.isLocalMemo ? req.body.isLocalMemo : false,
    createdBy: req.body.createdBy,
  });

  LoadingSlip.findOne(
    {},
    {},
    { sort: { createdAt: -1 } },
    function (err, foundLS) {
      if (foundLS) {
        loadingSlip.lsNo = foundLS.lsNo + 1;
      } else {
        loadingSlip.lsNo = 1;
      }
      LoadingSlip.create(loadingSlip, (error, data) => {
        if (error) {
          if (error.code === 11000) {
            return res.status(200).json({
              message: `LoadingSlip with challan no (${loadingSlip.lsNo}) already exist!`,
            });
          }
          res.send(error);
        } else {
          const allLR = req.body.lrList.map((lr) => lr._id);
          LorryReceipt.updateMany(
            { _id: { $in: allLR } },
            {
              $set: {
                status: 1,
                associatedLS: data._id,
                updatedBy: req.body.createdBy,
              },
            },
            { multi: true },
            (error, updatedLR) => {
              if (!error) {
                res.send(data);
              } else {
                res.send(error);
              }
            }
          );
        }
      });
    }
  );
};

const removeLoadingSlip = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Loading slip ID is required!" });
  }

  LoadingSlip.findById(req.params.id, (error, loadingSlip) => {
    if (error) {
      return res.status(200).json({ message: "Loading slip not found!" });
    }

    LoadingSlip.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          active: false,
          updatedBy: req.body.updatedBy,
        },
      },
      { new: true },
      (error, data) => {
        if (error) {
          res.status(200).json({ message: error.message });
        } else {
          LorryReceipt.updateMany(
            { associatedLS: data._id },
            {
              $set: {
                status: 0,
                associatedLS: "",
                updatedBy: req.body.updatedBy,
              },
            },
            { multi: true },
            (error, removedAssciationData) => {
              if (!error) {
                res.send({ id: data._id });
              } else {
                res.send(error);
              }
            }
          );
        }
      }
    );

    const allLR = loadingSlip.lrList.map((lr) => lr._id);
    LorryReceipt.updateMany(
      { _id: { $in: allLR } },
      { $set: { status: 0, associatedLS: "", updatedBy: req.body.updatedBy } },
      { multi: true },
      (error, updatedLR) => {
        if (!error) {
          LoadingSlip.findByIdAndUpdate(
            req.params.id,
            { $set: { active: false, updatedBy: req.body.updatedBy } },
            (lsError, data) => {
              if (lsError) {
                return res.status(200).json({ message: lsError.message });
              } else {
                res.status(200).json({ id: req.params.id });
              }
            }
          );
        } else {
          res.send(error);
        }
      }
    );
  });
};

const updateLoadingSlip = (req, res, next) => {
  const _id = req.body._id;

  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Loading slip ID is required!" });
  }

  LoadingSlip.findByIdAndUpdate(
    _id,
    {
      $set: {
        branch: req.body.branch,
        date: req.body.date,
        vehicleNo: req.body.vehicleNo,
        vehicleOwner: req.body.vehicleOwner,
        vehicleOwnerAddress: req.body.vehicleOwnerAddress,
        vehicleOwnerPhone: req.body.vehicleOwnerPhone,
        driverName: req.body.driverName,
        licenseNo: req.body.licenseNo,
        phone: req.body.phone,
        from: req.body.from,
        fromName: req.body.fromName,
        to: req.body.to,
        toName: req.body.toName,
        lrList: req.body.lrList,
        totalFreight: req.body.totalFreight,
        rent: req.body.rent,
        advance: req.body.advance,
        totalPayable: req.body.totalPayable,
        totalWeight: req.body.totalWeight,
        currentTime: req.body.currentTime,
        reachTime: req.body.reachTime,
        paybleAt: req.body.paybleAt,
        remark: req.body.remark,
        isLocalMemo: req.body.isLocalMemo ? req.body.isLocalMemo : false,
        updatedBy: req.body.updatedBy,
      },
    },
    { new: true },
    (error, data) => {
      if (error) {
        res.status(200).json({ message: error.message });
      } else {
        LorryReceipt.updateMany(
          { associatedLS: data._id },
          {
            $set: {
              status: 0,
              associatedLS: "",
              updatedBy: req.body.updatedBy,
            },
          },
          { multi: true },
          (error, removedAssciationData) => {
            if (!error) {
              const allLR = req.body.lrList.map((lr) => lr._id);
              LorryReceipt.updateMany(
                { _id: { $in: allLR } },
                {
                  $set: {
                    status: 1,
                    associatedLS: data._id,
                    updatedBy: req.body.updatedBy,
                  },
                },
                { multi: true },
                (error, updatedLR) => {
                  if (!error) {
                    res.send(data);
                  } else {
                    res.send(error);
                  }
                }
              );
            } else {
              res.send(error);
            }
          }
        );
      }
    }
  );
};

const getLoadingSlip = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Loading slip ID is required!" });
  }
  LoadingSlip.findById(req.params.id, (error, data) => {
    if (error) {
      return res.status(200).json({ message: error.message });
    }
    res.send(data);
  });
};

const printLoadingSlip = (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Challan ID is required!" });
  }
  LoadingSlip.findById(req.params.id, (lsErr, lsData) => {
    if (lsErr) {
      return res.status(200).json({ message: lsErr.message });
    }
    let total = 0;
    const lrList = [];
    lsData.lrList.forEach(async (lr, index) => {
      const lrData = await LorryReceipt.findById(lr._id);
      if (lrData) {
        const updatedLR = JSON.parse(JSON.stringify(lrData));
        updatedLR.articles = updatedLR.transactions
          .reduce((acc, item) => acc + item.articleNo, 0)
          ?.toFixed(2);
        updatedLR.weight = updatedLR.transactions
          .reduce((acc, item) => acc + item.weight, 0)
          ?.toFixed(2);
        updatedLR.srNo = index + 1;
        updatedLR.total =
          updatedLR.payType === "ToPay" ? updatedLR.total?.toFixed(2) : "-";
        updatedLR.lrNo = updatedLR.lrNo;
        if (updatedLR.payType === "ToPay") {
          total += +updatedLR.total;
        }
        lrList.push(updatedLR);
      }
      if (lsData.lrList.length === lrList.length) {
        const isTwoRowsOccupied = lrList?.some(
          ({ consigneeAddress, consignorName, consigneeName }) =>
            consigneeAddress?.length > 20 ||
            consignorName?.length > 20 ||
            consigneeName?.length > 20
        );
        const blankRows = [];
        const length =
          27 - (isTwoRowsOccupied ? lrList.length * 2 : lrList.length);
        for (let i = 0; i < length; i = i + 1) {
          blankRows.push({ sr: "-" });
        }
        const logo = base64_encode(
          path.join(__dirname, "../public/images/logo.png")
        );
        const laxmi = base64_encode(
          path.join(__dirname, "../public/images/laxmi.jpeg")
        );
        const templatePath =
          path.join(__dirname, "../bills/") + "LoadingSlip.html";
        res.render(
          templatePath,
          {
            info: {
              lsData: lsData,
              lsNo: lsData.lsNo,
              date: getFormattedDate(lsData.date),
              lrList: lrList.map((data, index) => ({
                ...data,
                srNo: index + 1,
              })),
              payable: getWordNumber(lsData.totalPayable || 0),
              freight: lsData.totalFreight?.toFixed(2),
              advance: lsData.advance?.toFixed(2),
              rent: lsData.rent?.toFixed(2),
              totalPayable: (+total + +lsData.totalPayable)?.toFixed(2),
              blankRows: blankRows,
              logo: logo,
              laxmi: laxmi,
              total: [{ total: total?.toFixed(2) }],
            },
          },
          (err, HTML) => {
            const fileName = lsData.lsNo;
            pdf.create(HTML, options2).toBuffer((buffErr, buffer) => {
              if (buffErr) {
                return res.status(200).json({ message: buffErr.message });
              }
              const base64String = buffer.toString("base64");
              if (req.body.email && req.body.email?.trim() !== "") {
                sendEmail(
                  req.body.email,
                  base64String,
                  `${fileName}.pdf`,
                  `JSM - Lorry Freight Challan no. ${fileName}`,
                  `JSM - Lorry Freight Challan no. ${fileName}`,
                  `<p><b>Hello</b></p><p>Please find attached lorry freight challan</p>`
                )
                  .then((response) => {
                    return res.json({ success: true });
                  })
                  .catch((err) => {
                    return res.status(200).json({ message: err });
                  });
              } else {
                return res.json({ file: base64String });
              }
            });
          }
        );
      }
    });
  });
};

const getMoneyTransfers = (req, res, next) => {
  if (!req.body.branch) {
    return res.status(200).json({ message: "Branch ID is required!" });
  }

  MoneyTransfer.find({ branch: req.body.branch, active: true })
    .limit(1000)
    .sort("-createdAt")
    .exec((error, moneyTransfers) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching money transfer list!",
        });
      } else {
        res.json(moneyTransfers);
      }
    });
};

const addMoneyTransfer = (req, res, next) => {
  const moneyTransfer = new MoneyTransfer({
    branch: req.body.branch,
    transferToBranch: req.body.transferToBranch,
    date: req.body.date,
    amount: req.body.amount,
    remark: req.body.remark,
    createdBy: req.body.createdBy,
  });

  MoneyTransfer.findOne(
    {},
    {},
    { sort: { createdAt: -1 } },
    function (err, foundMT) {
      if (foundMT) {
        moneyTransfer.pettyCashNo = foundMT.pettyCashNo + 1;
      } else {
        moneyTransfer.pettyCashNo = 1;
      }
      MoneyTransfer.create(moneyTransfer, (error, data) => {
        if (error) {
          if (error.code === 11000) {
            return res.status(200).json({
              message: `Money Transfer with petty cash no (${moneyTransfer.pettyCashNo}) already exist!`,
            });
          }
          return res.status(200).json({ message: error.message });
        } else {
          res.send(data);
        }
      });
    }
  );
};

const removeMoneyTransfer = (req, res, next) => {
  if (!req.params.id || !req.body.id) {
    return res.status(200).json({ message: "Money transfer ID is required!" });
  }
  const _id = req.body.id || req.params.id;
  MoneyTransfer.findByIdAndUpdate(
    _id,
    {
      $set: {
        active: false,
        updatedBy: req.body.updatedBy,
      },
    },
    { new: true },
    (error, data) => {
      if (error) {
        res.status(200).json({ message: error.message });
      } else {
        res.json(data);
      }
    }
  );
};

const updateMoneyTransfer = (req, res, next) => {
  const _id = req.body._id;

  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Money transfer ID is required!" });
  }

  MoneyTransfer.findByIdAndUpdate(
    _id,
    {
      $set: {
        branch: req.body.branch,
        transferToBranch: req.body.transferToBranch,
        date: req.body.date,
        amount: req.body.amount,
        remark: req.body.remark,
        updatedBy: req.body.updatedBy,
      },
    },
    { new: true },
    (error, data) => {
      if (error) {
        res.status(200).json({ message: error.message });
      } else {
        res.json(data);
      }
    }
  );
};

const getMoneyTransfer = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Money transfer ID is required!" });
  }
  MoneyTransfer.findById(req.params.id, (error, data) => {
    if (error) {
      return res.status(200).json({ message: error.message });
    }
    res.send(data);
  });
};

const getPettyTransactions = (req, res, next) => {
  if (!req.body.branch) {
    return res.status(200).json({ message: "Branch ID is required!" });
  }

  PettyTransaction.find({ branch: req.body.branch, active: true })
    .limit(1000)
    .sort("-createdAt")
    .exec((error, pettyTransactions) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching petty cash transactions!",
        });
      } else {
        res.json(pettyTransactions);
      }
    });
};

const addPettyTransaction = (req, res, next) => {
  const pettyTransaction = new PettyTransaction({
    branch: req.body.branch,
    transactionType: req.body.transactionType,
    transactionName: req.body.transactionName,
    type: req.body.type,
    lsNo: req.body.lsNo,
    amount: +req.body.amount,
    availableBal: +req.body.availableBal,
    date: req.body.date,
    bank: req.body.bank,
    bankAccountNumber: req.body.bankAccountNumber,
    description: req.body.description,
    createdBy: req.body.createdBy,
  });

  PettyTransaction.findOne(
    {},
    {},
    { sort: { createdAt: -1 } },
    function (err, foundPT) {
      if (foundPT) {
        pettyTransaction.transactionNo = foundPT.transactionNo + 1;
        if (pettyTransaction.type?.toLowerCase() === "credit") {
          pettyTransaction.availableBal =
            pettyTransaction.amount + foundPT.availableBal;
        }
        if (pettyTransaction.type?.toLowerCase() === "debit") {
          pettyTransaction.availableBal =
            foundPT.availableBal - pettyTransaction.amount;
        }
      } else {
        pettyTransaction.transactionNo = 1;
        if (pettyTransaction.type?.toLowerCase() === "credit") {
          pettyTransaction.availableBal = pettyTransaction.amount;
        }
        if (pettyTransaction.type?.toLowerCase() === "debit") {
          pettyTransaction.availableBal =
            pettyTransaction.availableBal - pettyTransaction.amount;
        }
      }
      PettyTransaction.create(pettyTransaction, (error, data) => {
        if (error) {
          if (error.code === 11000) {
            return res.status(200).json({
              message: `Petty Transaction with transaction no. (${pettyTransaction.transactionNo}) already exist!`,
            });
          }
          return res.status(200).json({ message: error.message });
        } else {
          res.send(data);
        }
      });
    }
  );
};

const getPettyCashBalance = (req, res, next) => {
  PettyTransaction.findOne(
    {},
    {},
    { sort: { createdAt: -1 } },
    function (error, foundPT) {
      if (error) {
        res.send(error);
      }
      if (foundPT && foundPT.availableBal) {
        res.send({ balance: foundPT.availableBal });
      } else {
        res.send({ balance: 0 });
      }
    }
  );
};

const getPettyTransactionsByDate = (req, res, next) => {
  if (!req.body.startDate || !req.body.endDate) {
    return res
      .status(200)
      .json({ message: "Start and end dates are required!" });
  }
  PettyTransaction.find(
    {
      createdAt: {
        $gte: new Date(req.body.startDate),
        $lte: new Date(req.body.endDate),
      },
      active: true,
    },
    (error, data) => {
      if (error) {
        res.status(200).json({ message: error.message });
      } else {
        res.json(data);
      }
    }
  );
};

const getLorryReceiptsByDate = (req, res, next) => {
  if (!req.body.startDate || !req.body.endDate) {
    return res
      .status(200)
      .json({ message: "Start and end dates are required!" });
  }
  if (!req.body.pagination.page || !req.body.pagination.limit) {
    return res.status(200).json({ message: "Pagination inputs not provided!" });
  }

  const limit = req.body.pagination.limit || 100;
  const start = (req.body.pagination.page - 1) * limit;
  const end = req.body.pagination.page * limit;
  const query = {
    active: true,
  };
  if (req.body.startDate) {
    const date = new Date(req.body.startDate);
    const updatedDate = new Date(date).setDate(date?.getDate() + 1);
    const newDate = new Date(updatedDate).setUTCHours(0, 0, 0, 000);
    query.date = {
      ...query.date,
      $gte: new Date(newDate)?.toISOString(),
    };
  }
  if (req.body.endDate) {
    const date = new Date(req.body.endDate);
    const updatedDate = new Date(date).setDate(date?.getDate() + 1);
    const newDate = new Date(updatedDate).setUTCHours(23, 59, 59, 999);
    query.date = {
      ...query.date,
      $lte: new Date(newDate)?.toISOString(),
    };
  }

  if (req.body.type === "loaded") {
    query.status = 1;
  }
  if (req.body.type === "unloaded") {
    query.unloadDate = { $exists: true, $ne: null };
  }

  LorryReceipt.find(query)
    // .limit(limit)
    // .skip(skip)
    .sort("-createdAt")
    .exec((err, data) => {
      if (err) {
        return res.status(200).json({ message: err.message });
      } else {
        return res.json({
          lorryReceipts: data.slice(start, end),
          count: data?.length,
        });
      }
    });
};

const getBills = (req, res, next) => {
  if (
    !req.body.branch ||
    !req.body.pagination ||
    !req.body.pagination.page ||
    !req.body.pagination.limit
  ) {
    return res
      .status(200)
      .json({ message: "Branch ID & pagination is required!" });
  }

  const limit = req.body.pagination.limit || 100;
  const start = (req.body.pagination.page - 1) * limit;
  const end = req.body.pagination.page * limit;

  Bill.aggregate([
    { $match: { branch: req.body.branch, active: true } },
    {
      $addFields: {
        customerId: { $toObjectId: "$customer" },
      },
    },
    {
      $lookup: {
        from: "customer",
        localField: "customerId",
        foreignField: "_id",
        as: "customer",
      },
    },
    { $unwind: { path: "$customer", preserveNullAndEmptyArrays: true } },
    { $sort: { createdAt: -1 } },
  ]).exec((error, bills) => {
    if (error) {
      return res.status(200).json({
        message: "Error fetching bills!",
      });
    } else {
      return res.json({
        bills: bills.slice(start, end),
        count: bills?.length,
      });
    }
  });
};

const getBillsByCustomer = (req, res, next) => {
  if (!req.body.customer) {
    return res.status(200).json({ message: "Customer ID is required!" });
  }

  Bill.find({ customer: req.body.customer, branch: req.body.branch })
    .limit(1000)
    .exec((error, bills) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching bills!",
        });
      } else {
        res.json(bills);
      }
    });
};

const addBill = (req, res, next) => {
  const bill = new Bill({
    branch: req.body.branch,
    date: req.body.date,
    from: req.body.from,
    to: req.body.to,
    customer: req.body.customer,
    lrList: req.body.lrList,
    totalFreight: +req.body.totalFreight,
    freight: +req.body.freight,
    localFreight: +req.body.localFreight,
    cgst: +req.body.cgst,
    cgstPercent: +req.body.cgstPercent,
    sgst: +req.body.sgst,
    sgstPercent: +req.body.sgstPercent,
    total: +req.body.total,
    grandTotal: +req.body.grandTotal,
    remark: req.body.remark,
    createdBy: req.body.createdBy,
  });

  Bill.findOne({}, {}, { sort: { createdAt: -1 } }, function (err, foundBill) {
    if (foundBill) {
      bill.billNo = foundBill.billNo + 1;
    } else {
      bill.billNo = 1;
    }
    Bill.create(bill, (error, data) => {
      if (error) {
        if (error.code === 11000) {
          return res.status(200).json({
            message: `Bill with Bill no. (${bill.billNo}) already exist!`,
          });
        }
        res.send(error);
      } else {
        const allLR = req.body.lrList.map((lr) => lr._id);
        LorryReceipt.updateMany(
          { _id: { $in: allLR } },
          {
            $set: {
              billGenerated: true,
              assoBill: data._id,
              updatedBy: req.body.createdBy,
            },
          },
          { multi: true },
          (error, updatedLR) => {
            if (!error) {
              res.send(data);
            } else {
              res.send(error);
            }
          }
        );
      }
    });
  });
};

const removeBill = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Bill ID is required!" });
  }

  Bill.findById(req.params.id, (err, foundBill) => {
    if (err) {
      return res.status(200).json({ message: err.message });
    } else {
      const allLR = foundBill.lrList.map((lr) => lr._id);

      Bill.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            active: false,
            updatedBy: req.body.updatedBy,
          },
        },
        { new: true },
        (billError, updatedBill) => {
          if (billError) {
            return res.status(200).json({ message: billError.message });
          } else {
            LorryReceipt.updateMany(
              { _id: { $in: allLR } },
              {
                $set: {
                  billGenerated: false,
                  assoBill: "",
                  updatedBy: req.body.updatedBy,
                },
              },
              { multi: true },
              (lrError, updatedLR) => {
                if (!lrError) {
                  res.status(200).json({ id: updatedBill._id });
                } else {
                  res.send(lrError);
                }
              }
            );
          }
        }
      );
    }
  });
};

const getBill = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Bill ID is required!" });
  }
  Bill.findById(req.params.id, (error, data) => {
    if (error) {
      return res.status(200).json({ message: error.message });
    }
    res.send(data);
  });
};

const updateBill = (req, res, next) => {
  const _id = req.body._id;

  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Bill ID is required!" });
  }

  Bill.findById(req.params.id, (err, foundBill) => {
    if (foundBill) {
      const allLR = foundBill.lrList.map((lr) => lr._id);
      LorryReceipt.updateMany(
        { _id: { $in: allLR } },
        {
          $set: {
            billGenerated: false,
            assoBill: "",
            updatedBy: req.body.updatedBy,
          },
        },
        { multi: true },
        (lrError, updatedLR) => {
          if (!lrError) {
            Bill.findByIdAndUpdate(
              _id,
              {
                $set: {
                  branch: req.body.branch,
                  date: req.body.date,
                  from: req.body.from,
                  to: req.body.to,
                  customer: req.body.customer,
                  lrList: req.body.lrList,
                  totalFreight: +req.body.totalFreight,
                  freight: +req.body.freight,
                  localFreight: +req.body.localFreight,
                  cgst: +req.body.cgst,
                  cgstPercent: +req.body.cgstPercent,
                  sgst: +req.body.sgst,
                  sgstPercent: +req.body.sgstPercent,
                  total: +req.body.total,
                  grandTotal: +req.body.grandTotal,
                  remark: req.body.remark,
                  updatedBy: req.body.updatedBy,
                },
              },
              { new: true },
              (error, data) => {
                if (error) {
                  res.status(200).json({ message: error.message });
                } else {
                  const updatedLR = req.body.lrList.map((lr) => lr._id);
                  LorryReceipt.updateMany(
                    { _id: { $in: updatedLR } },
                    {
                      $set: {
                        billGenerated: true,
                        assoBill: _id,
                        updatedBy: req.body.updatedBy,
                      },
                    },
                    { multi: true },
                    (updatedLRError, updatedBilledLR) => {
                      if (!updatedLRError) {
                        res.send(data);
                      } else {
                        res.send(updatedLRError);
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.send(lrError);
          }
        }
      );
    }
  });
};

const printBill = (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Bill ID is required!" });
  }
  Bill.findById(req.params.id, (findBillErr, data) => {
    if (findBillErr) {
      return res.status(200).json(findBillErr);
    }
    Customer.findById(data.customer, (findCustErr, custData) => {
      if (findCustErr) {
        return res.status(200).json(findCustErr);
      }
      const lrList = [];
      data.lrList.forEach(async (lorryReceipt) => {
        const foundLR = await LorryReceipt.findById(lorryReceipt._id);
        const _id = lorryReceipt._id;
        const lr = JSON.parse(JSON.stringify(foundLR));
        lr.formattedDate = getFormattedDate(lr.date);
        lr.formattedLRNo = lr.lrNo;
        lrList.push(lr);
        if (data.lrList.length === lrList.length) {
          const updatedLRList = [];
          let totalWeight = 0;
          let totalArticles = 0;
          lrList.forEach((lr) => {
            lr.transactions.forEach((tr, index) => {
              totalWeight = totalWeight + +tr.weight;
              totalArticles = totalArticles + +tr.articleNo;
              if (index === 0) {
                updatedLRList.push({
                  ...lr,
                  ...tr,
                  articleNo: tr.articleNo?.toFixed(2),
                  rate: tr.rate?.toFixed(2),
                  lrCharges: lr.lrCharges ? lr.lrCharges?.toFixed(2) : "0.00",
                  hamali: lr.hamali ? lr.hamali?.toFixed(2) : "0.00",
                  deliveryCharges: lr.deliveryCharges
                    ? lr.deliveryCharges?.toFixed(2)
                    : "0.00",
                  total: (
                    +tr.freight +
                    +lr.lrCharges +
                    +lr.hamali +
                    +lr.deliveryCharges
                  )?.toFixed(2),
                });
              } else {
                updatedLRList.push({
                  ...tr,
                  articleNo: tr.articleNo?.toFixed(2),
                  rate: tr.rate?.toFixed(2),
                  total: tr.freight?.toFixed(2),
                });
              }
            });
          });
          let blankRows = [];
          const isTwoRowsOccupied = lrList?.some(
            ({ article, to, invoiceNo }) =>
              to?.length > 15 || article?.length > 15 || invoiceNo?.length > 15
          );
          const length =
            23 -
            (isTwoRowsOccupied
              ? updatedLRList.length * 2
              : updatedLRList.length);
          for (let i = 0; i < length; i = i + 1) {
            blankRows.push({ sr: "-" });
          }
          const printData = {
            billNo: data.billNo,
            customerName: custData.name?.toUpperCase(),
            customerAddress: custData.city
              ? `${custData.address}, ${custData.city}`
              : custData.address,
            customerPhone: custData.telephone,
            customerGst: custData.gstNo,
            from: lrList[0].from
              ? lrList[0].from?.toUpperCase()
              : lrList[0].from,
            to: lrList[0].to ? lrList[0].to?.toUpperCase() : lrList[0].to,
            date: getFormattedDate(data.date),
            bill: data,
            customer: custData,
            lrList: lrList,
            updatedLRList: updatedLRList,
            blankRows,
            totalWeight: totalWeight?.toFixed(2),
            totalArticles: totalArticles?.toFixed(2),
            freight: (+data.totalFreight)?.toFixed(2),
            cgst: (+data.cgst)?.toFixed(2),
            cgstPercent: +data.cgstPercent?.toFixed(2),
            sgst: (+data.sgst)?.toFixed(2),
            sgstPercent: +data.sgstPercent?.toFixed(2),
            grandTotal: (
              +data.totalFreight +
              +data.freight +
              +data.localFreight +
              +data.sgst +
              +data.cgst
            )?.toFixed(2),
            totalInWords: getWordNumber(
              +data.totalFreight +
                +data.freight +
                +data.localFreight +
                +data.sgst +
                +data.cgst || 0
            ),
            otherFreight: data.freight,
            localFreight: data.localFreight,
          };
          const laxmi = base64_encode(
            path.join(__dirname, "../public/images/laxmi.jpeg")
          );
          const logo = base64_encode(
            path.join(__dirname, "../public/images/logo.png")
          );
          const templatePath = path.join(__dirname, "../bills/") + "Bill.html";
          res.render(
            templatePath,
            {
              info: {
                ...printData,
                logo,
                laxmi,
              },
            },
            (err, HTML) => {
              const finalPath = path.join(__dirname, "../bills/bills/");
              const fileName = data.billNo;
              pdf
                .create(HTML, options2)
                // .toFile(
                //   path.join(finalPath, fileName + ".pdf"),
                //   (err, result) => {
                //     if (err) {
                //       return res.status(200).send({
                //         message: err,
                //       });
                //     }
                //     return res.send(printData);
                //   }
                // );
                .toBuffer((buffErr, buffer) => {
                  if (buffErr) {
                    return res.status(200).json({ message: buffErr.message });
                  }
                  const base64String = buffer.toString("base64");
                  if (req.body.email && req.body.email?.trim() !== "") {
                    sendEmail(
                      req.body.email,
                      base64String,
                      `${fileName}.pdf`,
                      `JSM - Bill no. ${fileName}`,
                      `JSM - Bill no. ${fileName}`,
                      `<p><b>Hello</b></p><p>Please find attached bill.</p>`
                    )
                      .then((response) => {
                        return res.json({ success: true });
                      })
                      .catch((err) => {
                        return res.status(200).json({ message: err });
                      });
                  } else {
                    return res.json({ file: base64String });
                  }
                });
            }
          );
        }
      });
    });
  });
};

const exportToExcelBill = (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Bill ID is required!" });
  }
  Bill.findById(req.params.id, (findBillErr, data) => {
    if (findBillErr) {
      return res.status(200).json(findBillErr);
    }
    Customer.findById(data.customer, (findCustErr, custData) => {
      if (findCustErr) {
        return res.status(200).json(findCustErr);
      }
      const lrList = [];
      data.lrList.forEach(async (lorryReceipt) => {
        const foundLR = await LorryReceipt.findById(lorryReceipt._id);
        const _id = lorryReceipt._id;
        const lr = JSON.parse(JSON.stringify(foundLR));
        lr.formattedDate = getFormattedDate(lr.date);
        lr.formattedLRNo = lr.lrNo;
        lrList.push(lr);
        if (data.lrList.length === lrList.length) {
          const updatedLRList = [];
          let totalWeight = 0;
          let totalArticles = 0;
          lrList.forEach((lr) => {
            lr.transactions.forEach((tr, index) => {
              totalWeight = totalWeight + +tr.weight;
              totalArticles = totalArticles + +tr.articleNo;
              if (index === 0) {
                updatedLRList.push({
                  ...lr,
                  ...tr,
                  articleNo: tr.articleNo?.toFixed(2),
                  rate: tr.rate?.toFixed(2),
                  lrCharges: lr.lrCharges ? lr.lrCharges?.toFixed(2) : "0.00",
                  hamali: lr.hamali ? lr.hamali?.toFixed(2) : "0.00",
                  deliveryCharges: lr.deliveryCharges
                    ? lr.deliveryCharges?.toFixed(2)
                    : "0.00",
                  total: (
                    +tr.freight +
                    +lr.lrCharges +
                    +lr.hamali +
                    +lr.deliveryCharges
                  )?.toFixed(2),
                });
              } else {
                updatedLRList.push({
                  ...tr,
                  articleNo: tr.articleNo?.toFixed(2),
                  rate: tr.rate?.toFixed(2),
                  total: tr.freight?.toFixed(2),
                });
              }
            });
          });

          const workbook = exportBillToXlsx(updatedLRList);
          res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "bill.xlsx"
          );
          return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
          });
        }
      });
    });
  });
};

const updateBills = (req, res, next) => {
  if (req.body.bills.length <= 0) {
    return res.status(200).json({ message: "Bills are required!" });
  }

  let updatedBills = [];
  req.body.bills.forEach(async (bill) => {
    try {
      const billToBeUpdated = await Bill.findOne({ _id: bill._id });
      billToBeUpdated.paymentCollection.push(bill.payment);

      let savedBill = await billToBeUpdated.save();
      if (savedBill) {
        updatedBills.push(savedBill);
        savedBill = null;
        if (updatedBills.length === req.body.bills.length) {
          return res.send(updatedBills);
        }
      }
    } catch (e) {
      return res.status(200).json({ message: e.message });
    }
  });
};

const getLastLR = (req, res, next) => {
  LorryReceipt.find({ active: true })
    .sort({ _id: -1 })
    .limit(1)
    .exec(function (err, lr) {
      if (err) {
        res.status(200).json({ message: err.message });
      }
      if (lr.length) {
        return res.send(lr[0]);
      } else {
        return res.send({ lastLR: null });
      }
    });
};

const getLoadingSlipsBySupplier = (req, res, next) => {
  if (!req.params.id) {
    res.status(200).json({ message: "Supplier ID is required" });
  }

  Vehicle.find(
    { owner: req.params.id, active: true },
    (vehicleErr, vehicleData) => {
      if (vehicleErr) {
        return res.status(200).json({ message: vehicleErr.message });
      }
      if (vehicleData.length) {
        const vehicleNos = vehicleData.map(({ vehicleNo }) => vehicleNo);
        let query = {
          vehicleNo: {
            $in: vehicleNos,
          },
          active: true,
        };
        if (req.body.branch) {
          query = { ...query, branch: req.body.branch };
        }
        LoadingSlip.find(query, (LSErr, LSData) => {
          if (LSErr) {
            return res.status(200).json({ message: LSErr.message });
          }
          res.send(LSData);
        });
      } else {
        res.send([]);
      }
    }
  );
};

const saveSupplierPayments = (req, res, next) => {
  if (req.body.loadingSlips.length <= 0) {
    return res.status(200).json({ message: "Loading slips are required!" });
  }

  let updatedLs = [];
  req.body.loadingSlips.forEach(async (ls) => {
    try {
      const LSToBeUpdated = await LoadingSlip.findOne({ _id: ls.ls_id });
      LSToBeUpdated.supplierPayments.push(ls.payment);
      let savedLs = await LSToBeUpdated.save();
      if (savedLs) {
        updatedLs.push(savedLs);
        savedLs = null;
        if (updatedLs.length === req.body.loadingSlips.length) {
          return res.send(updatedLs);
        }
      }
    } catch (e) {
      return res.status(200).json({ message: e.message });
    }
  });
};

const saveSupplierBill = (req, res, next) => {
  const bill = new SuppliersBill({
    branch: req.body.branch,
    supplier: req.body.supplier,
    supplierType: req.body.supplierType,
    supplyContent: req.body.supplyContent,
    date: req.body.date,
    invoiceNo: req.body.invoiceNo,
    invoiceDate: req.body.invoiceDate,
    quantity: req.body.quantity,
    amount: req.body.amount,
    createdBy: req.body.createdBy,
  });

  SuppliersBill.create(bill, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
};

const getSupplierBills = (req, res, next) => {
  if (!req.params.supplier) {
    return res.status(200).json({ message: "Supplier ID is required!" });
  }
  let params = {
    supplier: req.params.supplier,
    active: true,
  };
  if (req.body.branch) {
    params = { ...params, branch: req.body.branch };
  }
  SuppliersBill.find(
    { supplier: req.params.supplier, active: true },
    (err, data) => {
      if (err) {
        res.status(200).json({ message: err.message });
      }
      res.send(data);
    }
  );
};

const updateSupplierBills = (req, res, next) => {
  if (req.body.supplierBills.length <= 0) {
    return res.status(200).json({ message: "Supplier bills are required!" });
  }

  const updatedBills = [];
  req.body.supplierBills.forEach(async (suppBill) => {
    try {
      const billsToBeUpdated = await SuppliersBill.findOne({
        _id: suppBill._id,
      });
      billsToBeUpdated.payments.push(suppBill.payment);
      let savedBill = await billsToBeUpdated.save();
      if (savedBill) {
        updatedBills.push(savedBill);
        savedBill = null;
        if (updatedBills.length === req.body.supplierBills.length) {
          return res.send(updatedBills);
        }
      }
    } catch (e) {
      return res.status(200).json({ message: e.message });
    }
  });
};

const updateLorryReceiptAckByLRNo = (req, res, next) => {
  if (!req.body.lrNo || req.noLrNo) {
    return res.status(200).json({ message: "Lorry receipt no is required!" });
  }

  if (req.alreadyExist) {
    return res
      .status(200)
      .json({ message: `POD file for ${req.body.lrNo} already exist!` });
  }

  if (req.lrNotExist) {
    return res
      .status(200)
      .json({ message: `${req.body.lrNo} does not exist!` });
  }

  if (!req.file) {
    return res.status(200).json({ message: "POD file is required!" });
  }
  let filePath = "";
  if (req.file) {
    const url = "https://" + req.get("host") + "/acknowledgement/";
    filePath = url + req.file.filename;
  }

  LorryReceipt.findOneAndUpdate(
    { wayBillNo: req.body.lrNo?.trim?.() },
    {
      $set: {
        ack: filePath,
        updatedBy: req.body.updatedBy,
      },
    },
    { new: true },
    (error, data) => {
      if (error) {
        res.status(200).json({ message: error.message });
      } else {
        res.json(data);
      }
    }
  );
};

const getQuotations = (req, res) => {
  Quotation.find(
    { active: true },
    {},
    { sort: { createdAt: -1 } },
    (err, data) => {
      if (err) {
        return res.status(200).json({ message: err.message });
      }
      return res.send(data);
    }
  );
};

const getQuotation = (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Quotation id is required" });
  }
  Quotation.findById(req.params.id, (err, data) => {
    if (err) {
      return res.status(200).json({ message: err.message });
    }
    return res.send(data);
  });
};

const addQuotation = (req, res) => {
  const quotation = new Quotation({
    date: req.body.date,
    customer: req.body.customer,
    from: req.body.from,
    to: req.body.to,
    ratePer: req.body.ratePer,
    otherField: req.body.otherField,
    stations: req.body.stations,
    createdBy: req.body.createdBy,
  });

  Quotation.findOne(
    {},
    {},
    { sort: { createdAt: -1 } },
    function (err, foundQuotation) {
      if (foundQuotation) {
        quotation.quotationNo = foundQuotation.quotationNo + 1;
      } else {
        quotation.quotationNo = 1;
      }
      Quotation.create(quotation, (error, data) => {
        if (error) {
          return res.status(200).json({ message: error.message });
        } else {
          return res.send(data);
        }
      });
    }
  );
};

const updateQuotation = (req, res) => {
  if (!req.body._id) {
    return res.status(200).json({ message: "Quotation ID is required!" });
  }

  Quotation.findByIdAndUpdate(
    req.body._id,
    {
      $set: {
        date: req.body.date,
        customer: req.body.customer,
        from: req.body.from,
        to: req.body.to,
        ratePer: req.body.ratePer,
        otherField: req.body.otherField,
        stations: req.body.stations,
        updatedBy: req.body.updatedBy,
      },
    },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(200).json({ message: error.message });
      } else {
        return res.json(data);
      }
    }
  );
};

const removeQuotation = (req, res) => {
  if (!req.params.id || !req.body.id) {
    return res.status(200).json({ message: "Quotation ID is required!" });
  }
  const _id = req.body.id || req.params.id;
  Quotation.findByIdAndUpdate(
    _id,
    {
      $set: {
        active: false,
        updatedBy: req.body.updatedBy,
      },
    },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(200).json({ message: error.message });
      } else {
        return res.json(data);
      }
    }
  );
};

const viewQuotation = (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Quotation ID is required" });
  }
  Quotation.findById(req.params.id, (error, data) => {
    if (error) {
      return res.status(200).json({ message: error.message });
    }
    if (data) {
      const stations1 = [];
      const stations2 = [];
      const stations3 = [];
      const row0 = [
        0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54,
        57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99,
      ];
      const row1 = [
        1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55,
        58, 61, 64, 67, 70, 73, 76, 79, 82, 85, 88, 91, 94, 97, 100,
      ];
      const row2 = [
        2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56,
        59, 62, 65, 68, 71, 74, 77, 80, 83, 86, 89, 92, 95, 98, 101,
      ];
      data.stations.forEach((station, index) => {
        if (row0.indexOf(index) >= 0) {
          stations1.push(station);
        } else if (row1.indexOf(index) >= 0) {
          stations2.push(station);
        } else if (row2.indexOf(index) >= 0) {
          stations3.push(station);
        } else {
          stations1.push(station);
        }
      });
      let blankRows1 = [];
      let blankRows2 = [];
      let blankRows3 = [];

      blankRows1.length =
        28 - stations1?.length < 0 ? 0 : 28 - stations1?.length;
      blankRows2.length =
        28 - stations2?.length < 0 ? 0 : 28 - stations2?.length;
      blankRows3.length =
        28 - stations3?.length < 0 ? 0 : 28 - stations3?.length;

      const logo = base64_encode(
        path.join(__dirname, "../public/images/logo.png")
      );
      const laxmi = base64_encode(
        path.join(__dirname, "../public/images/laxmi.jpeg")
      );
      const templatePath = path.join(__dirname, "../bills/") + "Quotation.html";
      res.render(
        templatePath,
        {
          info: {
            quotation: data,
            date: getFormattedDateString(data.date),
            fromDate: getFormattedDateString(data.from),
            toDate: getFormattedDateString(data.to),
            stations1: stations1,
            stations2: stations2,
            stations3: stations3,
            logo: logo,
            laxmi: laxmi,
            blankRows1,
            blankRows2,
            blankRows3,
          },
        },
        (err, HTML) => {
          const finalPath = path.join(__dirname, "../bills/quotations/");
          const fileName = data.quotationNo;
          pdf
            .create(HTML, options2)
            // .toFile(path.join(finalPath, fileName + ".pdf"), (err, result) => {
            //   if (err) {
            //     return res.status(200).send({
            //       message: err,
            //     });
            //   }
            //   return res.sendFile(result.filename);
            // });
            .toBuffer((buffErr, buffer) => {
              if (buffErr) {
                return res.status(200).json({ message: buffErr.message });
              }
              const base64String = buffer.toString("base64");

              if (req.body.email && req.body.email?.trim() !== "") {
                sendEmail(
                  req.body.email,
                  base64String,
                  `${fileName}.pdf`,
                  `JSM - Quotation no. ${fileName}`,
                  `JSM - Quotation no. ${fileName}`,
                  `<p><b>Hello</b></p><p>Please find attached quotation.</p>`
                )
                  .then((response) => {
                    return res.json({ success: true });
                  })
                  .catch((err) => {
                    return res.status(200).json({ message: err });
                  });
              } else {
                return res.json({ file: base64String });
              }
            });
        }
      );
    }
  });
};

const viewPaymentCollection = (req, res) => {
  if (!req.params.billId || !req.params.collectionId) {
    return res
      .status(200)
      .json({ message: "Bill and Collection IDs are required" });
  }
  Bill.findById(req.params.billId, async (err, data) => {
    if (err) {
      return res.status(200).json({ message: err.message });
    }
    let payment;
    if (data && data.paymentCollection && data.paymentCollection.length) {
      Customer.findById(data.customer, (customerErr, customerData) => {
        if (customerErr) {
          return res.status(200).json({ message: customerErr.message });
        }
        const payments = JSON.parse(JSON.stringify(data.paymentCollection));
        payment = payments.find((pay) => pay._id === req.params.collectionId);
        paymentIndex =
          payments.findIndex((pay) => pay._id === req.params.collectionId) + 1;
        const voucherNumber = `${data.billNo}_${paymentIndex}`;

        const logo = base64_encode(
          path.join(__dirname, "../public/images/logo.png")
        );
        const laxmi = base64_encode(
          path.join(__dirname, "../public/images/laxmi.jpeg")
        );
        const templatePath = path.join(__dirname, "../bills/") + "Voucher.html";

        res.render(
          templatePath,
          {
            info: {
              bill: data,
              billNo: data.billNo,
              billDate: getFormattedDateString(data.date),
              paymentDate: payment.chequeDate
                ? getFormattedDateString(payment.chequeDate)
                : getFormattedDateString(payment.receivingDate),
              voucherNumber: voucherNumber,
              customer: customerData,
              payment: payment.receive?.toFixed(2),
              paymentMode:
                payment.payMode?.toLowerCase() === "cheque"
                  ? `by ${payment.payMode} no`
                  : `by ${payment.payMode}`,
              chequeNo: payment.chequeNo ? payment.chequeNo : "-",
              bank: payment.bankName ? payment.bankName : "-",
              receive: getWordNumber(payment.receive || 0),
              date: getFormattedDateString(payment.receivingDate),
              note:
                payment.payMode?.toLowerCase() === "cheque"
                  ? "Subject to realisation of cheque"
                  : "",
              logo: logo,
              laxmi: laxmi,
            },
          },
          (err, HTML) => {
            const finalPath = path.join(__dirname, "../bills/vouchers/");
            const fileName = voucherNumber;
            pdf.create(HTML, options2).toBuffer((buffErr, buffer) => {
              if (buffErr) {
                return res.status(200).json({ message: buffErr.message });
              }
              const base64String = buffer.toString("base64");
              if (req.body.email && req.body.email?.trim() !== "") {
                sendEmail(
                  req.body.email,
                  base64String,
                  `${fileName}.pdf`,
                  `JSM - Payment voucher no. ${fileName}`,
                  `JSM - Payment voucher no. ${fileName}`,
                  `<p><b>Hello</b></p><p>Please find attached payment voucher.</p>`
                )
                  .then((response) => {
                    return res.json({ success: true });
                  })
                  .catch((err) => {
                    return res.status(200).json({ message: err });
                  });
              } else {
                return res.json({ file: base64String });
              }
            });
          }
        );
      });
    }
  });
};

const getLorryReceiptsForReport = (req, res) => {
  if (!req.body.pagination.page || !req.body.pagination.limit) {
    return res.status(200).json({ message: "Pagination inputs not provided!" });
  }

  const limit = req.body.pagination.limit || 100;
  const start = (req.body.pagination.page - 1) * limit;
  const end = req.body.pagination.page * limit;

  const query = { active: true };
  if (req.body.query) {
    if (req.body.query.branch) {
      query.branch = req.body.query.branch;
    }
    if (req.body.query.consignor) {
      query["$or"] = [
        { consignor: req.body.query.consignor },
        { consignee: req.body.query.consignor },
      ];
    }
    if (req.body.query.from) {
      const date = new Date(req.body.query.from);
      const updatedDate = new Date(date).setDate(date?.getDate() + 1);
      const newDate = new Date(updatedDate).setUTCHours(0, 0, 0, 000);
      query.date = {
        ...query.date,
        $gte: new Date(newDate)?.toISOString(),
      };
    }
    if (req.body.query.to) {
      const date = new Date(req.body.query.to);
      const updatedDate = new Date(date).setDate(date?.getDate() + 1);
      const newDate = new Date(updatedDate).setUTCHours(23, 59, 59, 999);
      query.date = {
        ...query.date,
        $lte: new Date(newDate)?.toISOString(),
      };
    }
    if (req.body.query.payType) {
      query.payType = req.body.query.payType;
    }

    if (req.body.query.searchText) {
      const searchText = new RegExp(req.body.query.searchText);
      query["$or"] = [
        ...(query["$or"] || []),
        { lrNo: { $regex: searchText, $options: "i" } },
        { date: { $regex: searchText, $options: "i" } },
        { invoiceNo: { $regex: searchText, $options: "i" } },
        { consignorName: { $regex: searchText, $options: "i" } },
        { consigneeName: { $regex: searchText, $options: "i" } },
        { from: { $regex: searchText, $options: "i" } },
        { to: { $regex: searchText, $options: "i" } },
        { payType: { $regex: searchText, $options: "i" } },
        ...(!isNaN(parseFloat(req.body.query.searchText))
          ? [{ total: { $regex: parseFloat(req.body.query.searchText) } }]
          : []),
      ];
    }
  }

  LorryReceipt.find(query)
    .sort("-createdAt")
    .exec((lrError, lorryReceipts) => {
      if (lrError) {
        return res.status(200).json({
          message: "Error fetching lorry receipts!",
        });
      } else {
        res.json({
          lorryReceipts: lorryReceipts.slice(start, end),
          count: lorryReceipts?.length,
        });
      }
    });
};

const downloadLRReport = (req, res) => {
  const query = { active: true };
  if (req.body.query) {
    if (req.body.query.branch) {
      query.branch = req.body.query.branch;
    }
    if (req.body.query.consignor) {
      query["$or"] = [
        { consignor: req.body.query.consignor },
        { consignee: req.body.query.consignor },
      ];
    }
    if (req.body.query.from) {
      const date = new Date(req.body.query.from);
      const updatedDate = new Date(date).setDate(date?.getDate() + 1);
      const newDate = new Date(updatedDate).setUTCHours(0, 0, 0, 000);
      query.date = {
        ...query.date,
        $gte: new Date(newDate)?.toISOString(),
      };
    }
    if (req.body.query.to) {
      const date = new Date(req.body.query.to);
      const updatedDate = new Date(date).setDate(date?.getDate() + 1);
      const newDate = new Date(updatedDate).setUTCHours(23, 59, 59, 999);
      query.date = {
        ...query.date,
        $lte: new Date(newDate)?.toISOString(),
      };
    }

    if (req.body.query.searchText) {
      const searchText = new RegExp(req.body.query.searchText);
      query["$or"] = [
        ...(query["$or"] || []),
        { lrNo: { $regex: searchText, $options: "i" } },
        { date: { $regex: searchText, $options: "i" } },
        { invoiceNo: { $regex: searchText, $options: "i" } },
        { consignorName: { $regex: searchText, $options: "i" } },
        { consigneeName: { $regex: searchText, $options: "i" } },
        { from: { $regex: searchText, $options: "i" } },
        { to: { $regex: searchText, $options: "i" } },
        { payType: { $regex: searchText, $options: "i" } },
        ...(!isNaN(parseFloat(req.body.query.searchText))
          ? [{ total: { $regex: parseFloat(req.body.query.searchText) } }]
          : []),
      ];
    }
  }
  LorryReceipt.find(query)
    .sort("-createdAt")
    .exec((err, data) => {
      if (err) {
        return res.status(200).json({ message: err.message });
      }
      if (data && data.length) {
        const updatedData = JSON.parse(JSON.stringify(data));
        const printData = [];
        updatedData.forEach(async (lr, index) => {
          try {
            const consignor = await Customer.findById(lr.consignor);
            const consignee = await Customer.findById(lr.consignee);
            lr.formattedLRNo = lr.lrNo;
            lr.formattedDate = getFormattedDate(lr.date);
            lr.consignorName =
              consignor && consignor.name ? consignor.name : lr.consignor;
            lr.consigneeName =
              consignee && consignee.name ? consignee.name : lr.consignee;
            lr.totalArticles = lr.transactions.reduce(
              (acc, tr) => acc + tr.articleNo,
              0
            );
            lr.totalWeight = lr.transactions.reduce(
              (acc, tr) => acc + tr.weight,
              0
            );
            lr.totalChargeWeight = lr.transactions.reduce(
              (acc, tr) => acc + tr.chargeWeight,
              0
            );
            lr.totalFreight = lr.transactions.reduce(
              (acc, tr) => acc + tr.freight,
              0
            );
            lr.index = index + 1;
            printData.push(lr);

            if (updatedData.length === printData.length) {
              const workbook = exportLRDataToXlsx(updatedData);
              res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              );
              res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "data.xlsx"
              );
              return workbook.xlsx.write(res).then(() => {
                res.status(200).end();
              });
            }
          } catch (e) {}
        });
      }
    });
};

const getAllLRAck = (req, res) => {
  let query = {
    active: true,
    status: { $ne: 0 },
    $or: [{ deliveryDate: null }, { deliveryDate: "" }],
  };
  if (req.body.branch) {
    query = { ...query, branch: req.body.branch };
  }
  LorryReceipt.find(query).exec((lrError, lorryReceipts) => {
    if (lrError) {
      return res.status(200).json({
        message: "Error fetching lorry receipts!",
      });
    } else {
      return res.json(lorryReceipts);
    }
  });
};

const getChallanAck = (req, res) => {
  const _id = req.params.id;
  const query = {
    lrList: {
      $elemMatch: {
        _id,
      },
    },
  };
  LoadingSlip.findOne(query).exec((lrError, lorryReceipts) => {
    if (lrError) {
      return res.status(200).json({
        message: "Error fetching lorry receipts!",
      });
    } else {
      return res.json(lorryReceipts);
    }
  });
};

const addFONum = (req, res) => {
  if (!req.body._id) {
    return res.status(200).json({ message: "Lorry receipt ID is required!" });
  }

  try {
    LorryReceipt.findByIdAndUpdate(
      req.body._id,
      {
        $set: {
          foNum: req.body.foNum,
          updatedBy: req.body.updatedBy,
        },
      },
      { new: true },
      (error, data) => {
        if (error) {
          res.status(200).json({ message: error.message });
        } else {
          res.json(data);
        }
      }
    );
  } catch (e) {
    return res.status(200).json({ message: e.message });
  }
};

const getLoadingSlipForReport = (req, res) => {
  if (!req.body.pagination.page || !req.body.pagination.limit) {
    return res.status(200).json({ message: "Pagination inputs not provided!" });
  }

  const limit = req.body.pagination.limit || 100;
  const start = (req.body.pagination.page - 1) * limit;
  const end = req.body.pagination.page * limit;

  const query = { active: true };
  if (req.body.query) {
    if (req.body.query.branch) {
      query.branch = req.body.query.branch;
    }
    if (req.body.query.from) {
      const date = new Date(req.body.query.from);
      const updatedDate = new Date(date).setDate(date?.getDate() + 1);
      const newDate = new Date(updatedDate).setUTCHours(0, 0, 0, 000);
      query.date = {
        ...query.date,
        $gte: new Date(newDate)?.toISOString(),
      };
    }
    if (req.body.query.to) {
      const date = new Date(req.body.query.to);
      const updatedDate = new Date(date).setDate(date?.getDate() + 1);
      const newDate = new Date(updatedDate).setUTCHours(23, 59, 59, 999);
      query.date = {
        ...query.date,
        $lte: new Date(newDate)?.toISOString(),
      };
    }
    if (req.body.query.lrNo) {
      query.lrList = {
        $elemMatch: {
          lrNo: new RegExp(req.body.query.lrNo?.toUpperCase()),
        },
      };
    }
  }

  LoadingSlip.find(query)
    .sort("-createdAt")
    .exec((lsError, loadingSlips) => {
      if (lsError) {
        return res.status(200).json({
          message: "Error fetching lorry receipt challans!",
        });
      } else {
        if (req.body.query.isPrint) {
          const updatedLS = loadingSlips.map((ls, index) => {
            ls.date = getFormattedDate(new Date(ls.date));
            ls.formattedLSNo = (ls.lsNo + "").padStart?.(6, "0");
            ls.index = index + 1;
            return ls;
          });
          const workbook = exportLRChallanDataToXlsx(updatedLS);
          res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "data.xlsx"
          );
          return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
          });
        } else {
          res.json({
            loadingSlips: loadingSlips.slice(start, end),
            count: loadingSlips?.length,
          });
        }
      }
    });
};

module.exports = {
  getLorryReceipts,
  getLorryReceiptsWithCount,
  getLRAckWithCount,
  getAllLorryReceiptsWithCount,
  getLorryReceiptsByConsignor,
  addLorryReceipt,
  removeLorryReceipt,
  viewLorryReceipt,
  getLorryReceipt,
  updateLorryReceipt,
  updateLorryReceiptAck,
  removeLorryReceiptAck,
  getLoadingSlips,
  addLoadingSlip,
  removeLoadingSlip,
  getLoadingSlip,
  updateLoadingSlip,
  printLoadingSlip,
  getMoneyTransfers,
  addMoneyTransfer,
  removeMoneyTransfer,
  updateMoneyTransfer,
  getMoneyTransfer,
  getPettyTransactions,
  addPettyTransaction,
  getPettyCashBalance,
  getPettyTransactionsByDate,
  getLoadingSlipsById,
  getLorryReceiptsByDate,
  getBills,
  getBillsByCustomer,
  addBill,
  removeBill,
  getBill,
  printBill,
  updateBill,
  updateBills,
  getLastLR,
  getLoadingSlipsBySupplier,
  saveSupplierPayments,
  saveSupplierBill,
  getSupplierBills,
  updateSupplierBills,
  updateLorryReceiptAckByLRNo,
  getQuotations,
  getQuotation,
  addQuotation,
  updateQuotation,
  removeQuotation,
  viewQuotation,
  viewPaymentCollection,
  getLorryReceiptsForReport,
  downloadLRReport,
  getAllLRAck,
  addFONum,
  getLoadingSlipForReport,
  getLorryReceiptsForLS,
  getChallanAck,
  exportToExcelBill,
};

const exportLRDataToXlsx = (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Lorry receipts");
  const columns = data.reduce(
    (acc, obj) => (acc = Object.getOwnPropertyNames(obj)),
    []
  );
  worksheet.columns = [
    { header: "Sr. No.", key: "index" },
    { header: "L.R. Note No.", key: "formattedLRNo" },
    { header: "Consign Date", key: "formattedDate" },
    { header: "Invoice no", key: "invoiceNo" },
    { header: "Vehicle no", key: "vehicleNo" },
    { header: "Consignor Name", key: "consignorName" },
    { header: "Consignee Name", key: "consigneeName" },
    { header: "From", key: "from" },
    { header: "To", key: "to" },
    { header: "Payment Mode", key: "payType" },
    { header: "Total Qty", key: "totalArticles" },
    { header: "Grand Total", key: "total" },
    { header: "Total weight", key: "totalWeight" },
    { header: "Total charge weight", key: "totalChargeWeight" },
    { header: "Total freight", key: "totalFreight" },
  ];
  worksheet.addRows(data);
  return workbook;
};

const exportLRChallanDataToXlsx = (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("LR Challan");
  const columns = data.reduce(
    (acc, obj) => (acc = Object.getOwnPropertyNames(obj)),
    []
  );

  worksheet.columns = [
    { header: "Sr. no", key: "index" },
    { header: "LS no.", key: "lsNo" },
    { header: "Date", key: "date" },
    { header: "Vehicle no", key: "vehicleNo" },
    { header: "Driver", key: "driverName" },
    { header: "Driver phone", key: "phone" },
    { header: "From", key: "fromName" },
    { header: "To", key: "toName" },
    { header: "Hire amount", key: "totalFreight" },
    { header: "Balance", key: "totalPayable" },
  ];
  worksheet.addRows(data);
  return workbook;
};

const exportBillToXlsx = (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Bill");
  const columns = data.reduce(
    (acc, obj) => (acc = Object.getOwnPropertyNames(obj)),
    []
  );
  worksheet.columns = [
    { header: "Date", key: "formattedDate" },
    { header: "LR No", key: "formattedLRNo" },
    { header: "Station", key: "to" },
    { header: "Invoice No.", key: "invoiceNo" },
    { header: "Article", key: "article" },
    { header: "FO Num", key: "foNum" },
    { header: "Weight", key: "weight" },
    { header: "No. of Article", key: "articleNo" },
    { header: "Rate", key: "rate" },
    { header: "LR Charge", key: "lrCharges" },
    { header: "Hamali", key: "hamali" },
    { header: "Delivery Charges", key: "deliveryCharges" },
    { header: "Amount", key: "total" },
  ];
  worksheet.addRows(data);
  return workbook;
};

const getFormattedDate = (date) => {
  const day = new Date(date)?.getDate();
  const month = new Date(date)?.getMonth() + 1;
  const year = new Date(date)?.getFullYear();
  return `${("0" + day).slice(-2)}-${("0" + month).slice(-2)}-${year}`;
};

// prefix 0 to a number
const pad = (num, size) => {
  if (typeof num === "number" && typeof size === "number") {
    let stringNum = num?.toString();
    while (stringNum.length < size) stringNum = "0" + stringNum;
    return stringNum;
  }
  return false;
};

const getWordNumber = (num) => {
  const [rupee, paise] = (num || 0)?.toFixed(2).split(".");
  if (parseInt(paise || 0)) {
    return `${titleCase(numWords(+rupee))} Rupees And ${titleCase(
      numWords(+paise)
    )} Paise only`;
  }
  return `${titleCase(numWords(num))} Rupees only`;
};

const titleCase = (str) => {
  str = str?.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i]?.charAt(0)?.toUpperCase() + str[i]?.slice(1);
  }
  return str.join(" ");
};

const base64_encode = (file) => {
  return "data:image/gif;base64," + fs.readFileSync(file, "base64");
};

const getFormattedDateString = (receivedDate) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(receivedDate);
  const day = date?.getDate();
  const formattedDay = ("0" + day).slice(-2);
  const month = date?.getMonth();
  const year = date?.getFullYear();

  return `${formattedDay} ${monthNames[month]} ${year}`;
};
