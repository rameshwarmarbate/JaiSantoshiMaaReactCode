const Branch = require("../models/Branch");
const Place = require("../models/Place");
const Employee = require("../models/Employee");
const Article = require("../models/Article");
const Customer = require("../models/Customer");
const Driver = require("../models/Driver");
const Supplier = require("../models/Supplier");
const VehicleType = require("../models/VehicleType");
const Vehicle = require("../models/Vehicle");
const Bank = require("../models/Bank");
const BankAccount = require("../models/BankAccount");
const RateMaster = require("../models/RateMaster");
const TransactionPrefix = require("../models/TransactionPrefix");
const LorryReceipt = require("../models/LorryReceipt");

// Add a branch
const addBranch = (req, res, next) => {
  const branch = new Branch({
    abbreviation: req.body.abbreviation?.trim?.(),
    branchCode: req.body.branchCode?.trim?.(),
    description: req.body.description?.trim?.(),
    name: req.body.name?.trim?.(),
    place: req.body.place?.trim?.(),
    printer: req.body.printer,
    createdBy: req.body.createdBy,
  });

  Branch.find(
    {
      $or: [
        { name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" } },
        {
          branchCode: {
            $regex: getRegex(req.body.branchCode?.trim?.()),
            $options: "i",
          },
        },
        {
          abbreviation: {
            $regex: getRegex(req.body.abbreviation?.trim?.()),
            $options: "i",
          },
        },
      ],
    },
    (error, foundBranches) => {
      if (error) {
        return next(error);
      }
      if (foundBranches && foundBranches.length > 0) {
        let message = "";
        for (const foundBranch of foundBranches) {
          if (
            foundBranch.branchCode?.toUpperCase() ===
              branch.branchCode?.toUpperCase() &&
            foundBranch.name?.toUpperCase() === branch.name?.toUpperCase()
          ) {
            message = `Branch with Branch code (${foundBranch.branchCode}) and Branch name (${foundBranch.name}) already exist!`;
            break;
          }
          if (
            foundBranch.branchCode?.toUpperCase() ===
            branch.branchCode?.toUpperCase()
          ) {
            message = `Branch with Branch code (${foundBranch.branchCode}) already exist!`;
            break;
          }
          if (foundBranch.name?.toUpperCase() === branch.name?.toUpperCase()) {
            message = `Branch with Branch name (${foundBranch.name}) already exist!`;
            break;
          }

          if (
            foundBranch.abbreviation?.toUpperCase() ===
            branch.abbreviation?.toUpperCase()
          ) {
            message = `Branch with Branch abbreviation (${foundBranch.abbreviation}) already exist!`;
            break;
          }
        }
        return res.status(200).json({
          message: message,
        });
      }
      Branch.create(branch, (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  );
};

// Get all branches (100 branches)
const getBranches = (req, res, next) => {
  Branch.find({ active: true })
    .sort("-createdAt")
    .exec((error, branches) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching branches!",
        });
      } else {
        res.json(branches);
      }
    });
};

// Get all branches (100 branches)
const getBranchList = (req, res, next) => {
  Branch.aggregate([
    { $match: { active: true } },
    {
      $addFields: {
        placeId: { $toObjectId: "$place" },
      },
    },
    {
      $lookup: {
        from: "place",
        localField: "placeId",
        foreignField: "_id",
        as: "place",
      },
    },
    { $unwind: { path: "$place", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        place: "$place.name",
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        _id: 1,
        branchCode: 1,
        abbreviation: 1,
        name: 1,
        place: 1,
        description: 1,
      },
    },
  ]).exec((error, branches) => {
    if (error) {
      return res.status(200).json({
        message: "Error fetching branches!",
      });
    } else {
      res.json(branches);
    }
  });
};

// Get a branch
const getBranch = (req, res, next) => {
  Branch.findById(req.params.id, (error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data);
    }
  });
};

// Remove a branch
const removeBranch = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Branch ID is required!" });
  }

  Branch.findByIdAndUpdate(
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
        res.json({ id: data._id });
      }
    }
  );
};

// Update a branch
const updateBranch = (req, res, next) => {
  const _id = req.body._id;

  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Branch ID is required!" });
  }

  Branch.find(
    {
      $or: [
        { name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" } },
        {
          branchCode: {
            $regex: getRegex(req.body.branchCode?.trim?.()),
            $options: "i",
          },
        },
        {
          abbreviation: {
            $regex: getRegex(req.body.abbreviation?.trim?.()),
            $options: "i",
          },
        },
      ],
      _id: { $ne: _id },
    },
    (error, foundBranches) => {
      if (error) {
        return next(error);
      }
      if (foundBranches && foundBranches.length > 0) {
        let message = "";
        for (const foundBranch of foundBranches) {
          if (
            foundBranch.branchCode?.toUpperCase() ===
              req.body.branchCode?.trim?.()?.toUpperCase() &&
            foundBranch.name?.toUpperCase() ===
              req.body.name?.trim?.()?.toUpperCase()
          ) {
            message = `Branch with Branch code (${foundBranch.branchCode}) and Branch name (${foundBranch.name}) already exist!`;
            break;
          }
          if (
            foundBranch.branchCode?.toUpperCase() ===
            req.body.branchCode?.trim?.()?.toUpperCase()
          ) {
            message = `Branch with Branch code (${foundBranch.branchCode}) already exist!`;
            break;
          }
          if (
            foundBranch.name?.toUpperCase() ===
            req.body.name?.trim?.()?.toUpperCase()
          ) {
            message = `Branch with Branch name (${foundBranch.name}) already exist!`;
            break;
          }
          if (
            foundBranch.abbreviation?.toUpperCase() ===
            req.body.abbreviation?.trim?.()?.toUpperCase()
          ) {
            message = `Branch with Branch abbreviation (${foundBranch.abbreviation}) already exist!`;
            break;
          }
        }
        return res.status(200).json({
          message: message,
        });
      }
      Branch.findByIdAndUpdate(
        _id,
        {
          $set: {
            branchCode: req.body.branchCode?.trim?.(),
            abbreviation: req.body.abbreviation?.trim?.(),
            name: req.body.name?.trim?.(),
            description: req.body.description?.trim?.(),
            place: req.body.place?.trim?.(),
            openingBalance: req.body.openingBalance,
            balanceType: req.body.balanceType,
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
  );
};

// Get places
const getPlaces = (req, res, next) => {
  Place.find({ active: true })
    .sort("-createdAt")
    .exec((error, places) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching places!",
        });
      } else {
        res.json(places);
      }
    });
};

// Add a Place
const addPlace = (req, res, next) => {
  const place = new Place({
    name: req.body.name?.trim?.(),
    abbreviation: req.body.abbreviation?.trim?.(),
    createdBy: req.body.createdBy,
  });

  Place.find(
    {
      $or: [
        { name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" } },
        {
          abbreviation: {
            $regex: getRegex(req.body.abbreviation?.trim?.()),
            $options: "i",
          },
        },
      ],
      active: true,
    },
    (error, foundPlaces) => {
      if (error) {
        return next(error);
      }
      if (foundPlaces && foundPlaces.length > 0) {
        let message = `Place with (${
          req.body.name?.trim?.()?.toUpperCase() ===
          foundPlaces.name?.trim()?.toUpperCase()
            ? req.body.name
            : req.body.abbreviation
        } already exist!)`;
        return res.status(200).json({
          message: message,
        });
      }
      Place.create(place, (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  );
};

// Remove a place
const removePlace = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Place ID is required!" });
  }

  Place.findByIdAndUpdate(
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
        res.json({ id: data._id });
      }
    }
  );
};

// Update a place
const updatePlace = (req, res, next) => {
  const _id = req.body._id;

  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Place ID is required!" });
  }

  Place.find(
    {
      $or: [
        { name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" } },
        {
          abbreviation: {
            $regex: getRegex(req.body.abbreviation?.trim?.()),
            $options: "i",
          },
        },
      ],
      _id: { $ne: _id },
      active: true,
    },
    (error, foundPlaces) => {
      if (error) {
        return next(error);
      }
      if (foundPlaces && foundPlaces.length > 0) {
        let message = `Place with (${
          req.body.name?.trim?.()?.toUpperCase() ===
          foundPlaces.name?.trim()?.toUpperCase()
            ? req.body.name
            : req.body.abbreviation
        } already exist!)`;
        return res.status(200).json({
          message: message,
        });
      }
      Place.findByIdAndUpdate(
        _id,
        {
          $set: {
            name: req.body.name?.trim?.(),
            abbreviation: req.body.abbreviation?.trim?.(),
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
  );
};

// Get a place
const getPlace = (req, res, next) => {
  Place.findById(req.params.id, (error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data);
    }
  });
};

// Add a employee
const addEmployee = (req, res, next) => {
  const employee = new Employee({
    code: req.body.code?.trim?.(),
    name: req.body.name?.trim?.(),
    telephone: req.body.telephone,
    correspondenceAddress: req.body.correspondenceAddress?.trim?.(),
    permanentAddress: req.body.permanentAddress?.trim?.(),
    dateOfBirth: req.body.dateOfBirth,
    mobile: req.body.mobile,
    email: req.body.email?.trim?.(),
    joiningDate: req.body.joiningDate,
    qualification: req.body.qualification,
    bloodGroup: req.body.bloodGroup,
    designation: req.body.designation?.trim?.(),
    createdBy: req.body.createdBy,
  });

  Employee.find(
    {
      $or: [
        { telephone: req.body.telephone?.trim?.() },
        { name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" } },
      ],
      active: true,
    },
    (error, foundEmp) => {
      if (error) {
        return next(error);
      }
      if (foundEmp && foundEmp.length > 0) {
        let message = `Employee with telephone (${req.body.telephone}) or name (${req.body.name}) already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      Employee.create(employee, (error, data) => {
        if (error) {
          if (error.code === 11000) {
            return res.status(200).json({
              message: `Employee with code (${req.body.code}) already exist!`,
            });
          }
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  );
};

// Get 100 employees
const getEmployees = (req, res, next) => {
  Employee.find({ active: true })
    .sort("-createdAt")
    .exec((error, employees) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching employees!",
        });
      } else {
        res.json(employees);
      }
    });
};

// Remove a employee
const removeEmployee = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Employee ID is required!" });
  }

  Employee.findByIdAndUpdate(
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
        res.json({ id: data._id });
      }
    }
  );
};

// Update a employee
const updateEmployee = (req, res, next) => {
  const _id = req.body._id;

  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Employee ID is required!" });
  }

  Employee.find(
    {
      $or: [
        { telephone: req.body.telephone?.trim?.() },
        { name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" } },
      ],
      _id: { $ne: _id },
      active: true,
    },
    (error, foundEmp) => {
      if (error) {
        return next(error);
      }
      if (foundEmp && foundEmp.length > 0) {
        let message = `Employee with telephone (${req.body.telephone}) or name (${req.body.name}) already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      Employee.findByIdAndUpdate(
        _id,
        {
          $set: {
            name: req.body.name?.trim?.(),
            telephone: req.body.telephone,
            correspondenceAddress: req.body.correspondenceAddress?.trim?.(),
            permanentAddress: req.body.permanentAddress?.trim?.(),
            dateOfBirth: req.body.dateOfBirth,
            mobile: req.body.mobile,
            email: req.body.email?.trim?.(),
            joiningDate: req.body.joiningDate,
            qualification: req.body.qualification,
            bloodGroup: req.body.bloodGroup,
            designation: req.body.designation?.trim?.(),
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
  );
};

// Get a employee
const getEmployee = (req, res, next) => {
  Employee.findById(req.params.id, (error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data);
    }
  });
};

// Get articles
const getArticles = (req, res, next) => {
  Article.find({ active: true })
    .sort("-createdAt")
    .exec((error, articles) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching articles!",
        });
      } else {
        res.json(articles);
      }
    });
};

// Get a article
const getArticle = (req, res, next) => {
  Article.findById(req.params.id, (error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data);
    }
  });
};

// Add a article
const addArticle = (req, res, next) => {
  const article = new Article({
    name: req.body.name?.toUpperCase()?.trim?.(),
    description: req.body.description?.trim?.(),
    createdBy: req.body.createdBy,
  });

  Article.find(
    {
      name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" },
      active: true,
    },
    (error, foundArticles) => {
      if (error) {
        return next(error);
      }
      if (foundArticles && foundArticles.length > 0) {
        let message = `Articles with (${req.body.name} already exist!)`;
        return res.status(200).json({
          message: message,
        });
      }
      Article.create(article, (error, data) => {
        if (error) {
          if (error.code === 11000) {
            return res.status(200).json({
              message: `Article with name (${req.body.name}) already exist!`,
            });
          }
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  );
};

// Remove a article
const removeArticle = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Article ID is required!" });
  }
  Article.findByIdAndUpdate(
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
        res.json({ id: data._id });
      }
    }
  );
};

// Update a place
const updateArticle = (req, res, next) => {
  const _id = req.body._id;

  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Article ID is required!" });
  }

  Article.find(
    {
      name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" },
      _id: { $ne: _id },
      active: true,
    },
    (error, foundArticles) => {
      if (error) {
        return next(error);
      }
      if (foundArticles && foundArticles.length > 0) {
        let message = `Articles with (${req.body.name} already exist!)`;
        return res.status(200).json({
          message: message,
        });
      }
      Article.findByIdAndUpdate(
        _id,
        {
          $set: {
            branch: req.body.branch?.trim?.(),
            name: req.body.name?.toUpperCase()?.trim?.(),
            description: req.body.description?.trim?.(),
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
  );
};

// Get customers
const getCustomers = (req, res, next) => {
  Customer.find({ active: true })
    .sort("-createdAt")
    .exec((error, customers) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching customers!",
        });
      } else {
        res.json(customers);
      }
    });
};

const getCustomersByBranch = (req, res, next) => {
  if (!req.body.branchId) {
    return res.status(200).json({ message: "Branch ID is required" });
  }

  Customer.find({
    branch: req.body.branchId,
    active: true,
  }).exec((error, customers) => {
    if (error) {
      return res.status(200).json({
        message: "Error fetching customers!",
      });
    } else {
      res.json(customers);
    }
  });
};

// Get a customer
const getCustomer = (req, res, next) => {
  Customer.findById(req.params.id, (error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data);
    }
  });
};

// Add a customer
const addCustomer = (req, res, next) => {
  const customer = new Customer({
    name: req.body.name
      ? req.body.name?.toUpperCase()?.trim?.()
      : req.body.name,
    address: req.body.address?.trim?.(),
    telephone: req.body.telephone,
    fax: req.body.fax,
    cstNo: req.body.cstNo,
    gstNo: req.body.gstNo,
    state: req.body.state?.trim?.(),
    city: req.body.city?.trim?.(),
    email: req.body.email?.trim?.(),
    vendorCode: req.body.vendorCode,
    vatNo: req.body.vatNo,
    eccNo: req.body.eccNo,
    contactPerson: req.body.contactPerson,
    createdBy: req.body.createdBy,
  });

  Customer.find(
    {
      name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" },
      active: true,
    },
    (error, foundCustomer) => {
      if (error) {
        return next(error);
      }
      if (foundCustomer && foundCustomer.length > 0) {
        let message = `Customer with name (${req.body.name}) already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      Customer.create(customer, (error, data) => {
        if (error) {
          if (error.code === 11000) {
            return res.status(200).json({
              message: `Customer with name (${req.body.name}) already exist!`,
            });
          }
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  );
};

// Update a customer
const updateCustomer = (req, res, next) => {
  const _id = req.body._id;
  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Customer ID is required!" });
  }

  Customer.find(
    {
      name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" },
      _id: { $ne: _id },
      active: true,
    },
    (error, foundCustomer) => {
      if (error) {
        return next(error);
      }
      if (foundCustomer && foundCustomer.length > 0) {
        let message = `Customer with name (${req.body.name}) already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      Customer.findByIdAndUpdate(
        _id,
        {
          $set: {
            name: req.body.name
              ? req.body.name?.toUpperCase()?.trim?.()
              : req.body.name,
            address: req.body.address?.trim?.(),
            telephone: req.body.telephone,
            fax: req.body.fax,
            cstNo: req.body.cstNo,
            gstNo: req.body.gstNo,
            state: req.body.state?.trim?.(),
            city: req.body.city?.trim?.(),
            email: req.body.email?.trim?.(),
            vendorCode: req.body.vendorCode,
            vatNo: req.body.vatNo,
            eccNo: req.body.eccNo,
            contactPerson: req.body.contactPerson,
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
  );
};

// Remove a customer
const removeCustomer = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Customer ID is required!" });
  }

  // Customer.findByIdAndUpdate(
  //   req.params.id,
  //   {
  //     $set: {
  //       active: false,
  //       updatedBy: req.body.updatedBy
  //     }
  //   },
  //   { new: true },
  //   (error, data) => {
  //     if (error) {
  //       res.status(200).json({ message: error.message });
  //     } else {
  //       res.json({ id: data._id });
  //     }
  //   });
  Customer.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      res.status(200).json({ message: error.message });
    } else {
      res.json({ id: data._id });
    }
  });
};

// Get drivers
const getDrivers = (req, res, next) => {
  Driver.find({ active: true })
    .sort("-createdAt")
    .exec((error, drivers) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching drivers!",
        });
      } else {
        res.json(drivers);
      }
    });
};

// Get a driver
const getDriver = (req, res, next) => {
  Driver.findById(req.params.id, (error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data);
    }
  });
};

// Add a driver
const addDriver = (req, res, next) => {
  const driver = new Driver({
    code: req.body.code?.trim?.(),
    name: req.body.name?.trim?.(),
    correspondenceAddress: req.body.correspondenceAddress?.trim?.(),
    permanentAddress: req.body.permanentAddress?.trim?.(),
    dateOfBirth: req.body.dateOfBirth,
    telephone: req.body.telephone,
    mobile: req.body.mobile,
    fatherName: req.body.fatherName?.trim?.(),
    referencedBy: req.body.referencedBy,
    eyeSight: req.body.eyeSight,
    licenseNo: req.body.licenseNo,
    licenseType: req.body.licenseType,
    qualification: req.body.qualification,
    joiningDate: req.body.joiningDate,
    bloodGroup: req.body.bloodGroup,
    renewDate: req.body.renewDate,
    expiryDate: req.body.expiryDate,
    remark: req.body.remark?.trim?.(),
    createdBy: req.body.createdBy,
  });

  Driver.find(
    { telephone: req.body.telephone?.trim?.(), active: true },
    (error, foundDrivers) => {
      if (error) {
        return next(error);
      }
      if (foundDrivers && foundDrivers.length > 0) {
        let message = `Driver with telephone no (${req.body.telephone} already exist!)`;
        return res.status(200).json({
          message: message,
        });
      }
      Driver.create(driver, (error, data) => {
        if (error) {
          if (error.code === 11000) {
            return res.status(200).json({
              message: `Driver with (${req.body.code}) already exist!`,
            });
          }
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  );
};

// Remove a driver
const removeDriver = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Driver ID is required!" });
  }

  Driver.findByIdAndUpdate(
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
        res.json({ id: data._id });
      }
    }
  );
};

// Update a driver
const updateDriver = (req, res, next) => {
  const _id = req.body._id;

  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Driver ID is required!" });
  }
  Driver.find(
    {
      telephone: req.body.telephone?.trim?.(),
      _id: { $ne: _id },
      active: true,
    },
    (error, foundDrivers) => {
      if (error) {
        return next(error);
      }
      if (foundDrivers && foundDrivers.length > 0) {
        let message = `Driver with telephone no (${req.body.telephone} already exist!)`;
        return res.status(200).json({
          message: message,
        });
      }
      Driver.findByIdAndUpdate(
        _id,
        {
          $set: {
            name: req.body.name?.trim?.(),
            correspondenceAddress: req.body.correspondenceAddress?.trim?.(),
            permanentAddress: req.body.permanentAddress?.trim?.(),
            dateOfBirth: req.body.dateOfBirth,
            telephone: req.body.telephone,
            mobile: req.body.mobile,
            fatherName: req.body.fatherName?.trim?.(),
            referencedBy: req.body.referencedBy?.trim?.(),
            eyeSight: req.body.eyeSight,
            licenseNo: req.body.licenseNo?.trim?.(),
            licenseType: req.body.licenseType,
            qualification: req.body.qualification?.trim?.(),
            joiningDate: req.body.joiningDate,
            bloodGroup: req.body.bloodGroup,
            renewDate: req.body.renewDate,
            expiryDate: req.body.expiryDate,
            remark: req.body.remark?.trim?.(),
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
  );
};

// Get suppliers
const getSuppliers = (req, res, next) => {
  Supplier.find({ active: true })
    .sort("-createdAt")
    .exec((error, suppliers) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching suppliers!",
        });
      } else {
        res.json(suppliers);
      }
    });
};

const getSuppliersByType = (req, res, next) => {
  if (!req.body.supplierType) {
    return res.status(200).json({ message: "Supplier type is required!" });
  }
  Supplier.find({ type: req.body.supplierType?.trim?.(), active: true }).exec(
    (error, suppliers) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching suppliers!",
        });
      } else {
        res.json(suppliers);
      }
    }
  );
};

// Get a supplier
const getSupplier = (req, res, next) => {
  Supplier.findById(req.params.id, (error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data);
    }
  });
};

// Add a supplier
const addSupplier = (req, res, next) => {
  const supplier = new Supplier({
    name: req.body.name?.trim?.(),
    type: req.body.type?.trim?.(),
    address: req.body.address?.trim?.(),
    state: req.body.state?.trim?.(),
    city: req.body.city?.trim?.(),
    phone: req.body.phone,
    email: req.body.email?.trim?.(),
    panNo: req.body.panNo,
    vendorCode: req.body.vendorCode,
    vatNo: req.body.vatNo,
    cstNo: req.body.cstNo,
    eccNo: req.body.eccNo,
    contactPerson: req.body.contactPerson,
    createdBy: req.body.createdBy,
  });

  Supplier.find(
    {
      name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" },
      active: true,
    },
    (error, foundSupplier) => {
      if (error) {
        return next(error);
      }
      if (foundSupplier && foundSupplier.length > 0) {
        let message = `Supplier with (${req.body.name}) & type (${req.body.type})  already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      Supplier.create(supplier, (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  );
};

// Update a supplier
const updateSupplier = (req, res, next) => {
  const _id = req.body._id;
  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Supplier ID is required!" });
  }
  Supplier.find(
    {
      name: { $regex: getRegex(req.body.name?.trim?.()), $options: "i" },
      _id: { $ne: _id },
      active: true,
    },
    (error, foundSupplier) => {
      if (error) {
        return next(error);
      }
      if (foundSupplier && foundSupplier.length > 0) {
        let message = `Supplier with (${req.body.name}) & type (${req.body.type})  already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      Supplier.findByIdAndUpdate(
        _id,
        {
          $set: {
            name: req.body.name?.trim?.(),
            type: req.body.type?.trim?.(),
            address: req.body.address?.trim?.(),
            state: req.body.state?.trim?.(),
            city: req.body.city?.trim?.(),
            phone: req.body.phone,
            email: req.body.email?.trim?.(),
            panNo: req.body.panNo,
            vendorCode: req.body.vendorCode,
            vatNo: req.body.vatNo,
            cstNo: req.body.cstNo,
            eccNo: req.body.eccNo,
            contactPerson: req.body.contactPerson,
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
  );
};

// Remove a supplier
const removeSupplier = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Supplier ID is required!" });
  }
  Supplier.findByIdAndUpdate(
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
        res.json({ id: data._id });
      }
    }
  );
};

// Get vehicle types
const getVehicleTypes = (req, res, next) => {
  VehicleType.find({ active: true })
    .sort("-createdAt")
    .exec((error, vehicleTypes) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching vehicle types!",
        });
      } else {
        res.json(vehicleTypes);
      }
    });
};

// Get a vehicle type
const getVehicleType = (req, res, next) => {
  VehicleType.findById(req.params.id, (error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data);
    }
  });
};

// Add a vehicle type
const addVehicleType = (req, res, next) => {
  const vehicleType = new VehicleType({
    type: req.body.type,
    tyreQuantity: req.body.tyreQuantity,
    createdBy: req.body.createdBy,
  });

  VehicleType.find(
    { type: { $regex: getRegex(req.body.type?.trim?.()), $options: "i" } },
    (error, foundType) => {
      if (error) {
        return next(error);
      }
      if (foundType && foundType.length > 0) {
        const message = `Vehicle type with (${req.body.type} already exist!)`;
        return res.status(200).json({
          message: message,
        });
      }
      VehicleType.create(vehicleType, (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  );
};

// Remove a vehicle type
const removeVehicleType = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Vehicle type ID is required!" });
  }
  VehicleType.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      res.status(200).json({ message: error.message });
    } else {
      res.json({ id: data._id });
    }
  });
};

// Update a vehicle type
const updateVehicleType = (req, res, next) => {
  const _id = req.body._id;

  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Vehicle type ID is required!" });
  }
  VehicleType.find(
    {
      type: { $regex: getRegex(req.body.type?.trim?.()), $options: "i" },
      _id: { $ne: _id },
    },
    (error, foundType) => {
      if (error) {
        return next(error);
      }
      if (foundType && foundType.length > 0) {
        const message = `Vehicle type with (${req.body.type} already exist!)`;
        return res.status(200).json({
          message: message,
        });
      }
      VehicleType.findByIdAndUpdate(
        _id,
        {
          $set: {
            type: req.body.type,
            tyreQuantity: req.body.tyreQuantity,
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
  );
};

// Get vehicles
const getVehicles = (req, res, next) => {
  Vehicle.find({ active: true })
    .sort("-createdAt")
    .exec((error, vehicles) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching vehicles!",
        });
      } else {
        res.json(vehicles);
      }
    });
};

// Get vehicles
const getVehicleList = (req, res, next) => {
  Vehicle.aggregate([
    { $match: { active: true } },
    {
      $addFields: {
        vehicleTypeId: { $toObjectId: "$vehicleType" },
      },
    },
    {
      $addFields: {
        supplierId: { $toObjectId: "$owner" },
      },
    },
    {
      $lookup: {
        from: "vehicleType",
        localField: "vehicleTypeId",
        foreignField: "_id",
        as: "vehicleType",
      },
    },
    { $unwind: { path: "$vehicleType", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "supplier",
        localField: "supplierId",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $addFields: {
        vehicleType: "$vehicleType.type",
      },
    },
    {
      $addFields: {
        ownerName: "$owner.name",
      },
    },
    {
      $addFields: {
        ownerAddress: "$owner.address",
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        _id: 1,
        vehicleNo: 1,
        ownerName: 1,
        ownerAddress: 1,
        vehicleType: 1,
      },
    },
  ]).exec((error, vehicles) => {
    if (error) {
      return res.status(200).json({
        message: "Error fetching vehicles!",
      });
    } else {
      res.json(vehicles);
    }
  });
};

// Get a vehicle
const getVehicle = (req, res, next) => {
  Vehicle.findById(req.params.id, (error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data);
    }
  });
};

// Add a vehicle
const addVehicle = (req, res, next) => {
  const vehicle = new Vehicle({
    owner: req.body.owner?.trim?.(),
    vehicleNo: req.body.vehicleNo?.toUpperCase()?.trim?.(),
    vehicleType: req.body.vehicleType?.trim?.(),
    make: req.body.make,
    capacity: req.body.capacity,
    regDate: req.body.regDate,
    chassisNo: req.body.chassisNo,
    engineNo: req.body.engineNo,
    description: req.body.description?.trim?.(),
    taxDetails: req.body.taxDetails,
    createdBy: req.body.createdBy,
  });

  Vehicle.find(
    {
      vehicleNo: {
        $regex: getRegex(req.body.vehicleNo?.trim?.()),
        $options: "i",
      },
    },
    (error, foundVehicle) => {
      if (error) {
        return next(error);
      }
      if (foundVehicle && foundVehicle.length > 0) {
        let message = `Vehicle with number (${req.body.vehicleNo}) already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      Vehicle.create(vehicle, (error, data) => {
        if (error) {
          return res.status(200).json({ message: error.message });
        } else {
          res.send(data);
        }
      });
    }
  );
};

// Update a vehicle
const updateVehicle = (req, res, next) => {
  const _id = req.body._id;
  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Vehicle ID is required!" });
  }
  Vehicle.find(
    {
      vehicleNo: {
        $regex: getRegex(req.body.vehicleNo?.trim?.()),
        $options: "i",
      },
      _id: { $ne: _id },
    },
    (error, foundVehicle) => {
      if (error) {
        return next(error);
      }
      if (foundVehicle && foundVehicle.length > 0) {
        let message = `Vehicle with number (${req.body.vehicleNo}) already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      Vehicle.findByIdAndUpdate(
        _id,
        {
          $set: {
            owner: req.body.owner?.trim?.(),
            vehicleNo: req.body.vehicleNo?.toUpperCase()?.trim?.(),
            vehicleType: req.body.vehicleType?.trim?.(),
            make: req.body.make,
            capacity: req.body.capacity,
            regDate: req.body.regDate,
            chassisNo: req.body.chassisNo,
            engineNo: req.body.engineNo,
            description: req.body.description?.trim?.(),
            taxDetails: req.body.taxDetails,
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
  );
};

// Remove a vehicle
const removeVehicle = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Vehicle ID is required!" });
  }
  Vehicle.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      res.status(200).json({ message: error.message });
    } else {
      res.json({ id: data._id });
    }
  });
};

// Get banks
const getBanks = (req, res, next) => {
  Bank.find({ active: true })
    .sort("-createdAt")
    .exec((error, banks) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching banks!",
        });
      } else {
        res.json(banks);
      }
    });
};

// Get a bank
const getBank = (req, res, next) => {
  Bank.findById(req.params.id, (error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data);
    }
  });
};

// Add a bank
const addBank = (req, res, next) => {
  const bank = new Bank({
    name: req.body.name?.trim?.(),
    branchName: req.body.branchName?.trim?.(),
    branchCode: req.body.branchCode?.trim?.(),
    ifsc: req.body.ifsc?.trim?.(),
    micr: req.body.micr?.trim?.(),
    phone: req.body.phone,
    email: req.body.email?.trim?.(),
    address: req.body.address?.trim?.(),
    createdBy: req.body.createdBy,
  });

  Bank.find(
    {
      ifsc: { $regex: getRegex(req.body.ifsc?.trim?.()), $options: "i" },
      active: true,
    },
    (error, foundBank) => {
      if (error) {
        return next(error);
      }
      if (foundBank && foundBank.length > 0) {
        let message = `Bank with ifsc number (${req.body.ifsc}) already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      Bank.create(bank, (error, data) => {
        if (error) {
          if (error.code === 11000) {
            return res.status(200).json({
              message: `Bank with ifsc or micr (${req.body.name}) already exist!`,
            });
          }
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  );
};

// Update a bank
const updateBank = (req, res, next) => {
  const _id = req.body._id;
  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Bank ID is required!" });
  }
  Bank.find(
    {
      ifsc: { $regex: getRegex(req.body.ifsc?.trim?.()), $options: "i" },
      _id: { $ne: _id },
      active: true,
    },
    (error, foundBank) => {
      if (error) {
        return next(error);
      }
      if (foundBank && foundBank.length > 0) {
        let message = `Bank with ifsc number (${req.body.ifsc}) already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      Bank.findByIdAndUpdate(
        _id,
        {
          $set: {
            name: req.body.name?.trim?.(),
            branchName: req.body.branchName?.trim?.(),
            branchCode: req.body.branchCode?.trim?.(),
            ifsc: req.body.ifsc?.trim?.(),
            micr: req.body.micr?.trim?.(),
            phone: req.body.phone,
            email: req.body.email?.trim?.(),
            address: req.body.address?.trim?.(),
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
  );
};

// Remove a bank
const removeBank = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Bank ID is required!" });
  }

  Bank.findByIdAndUpdate(
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
        res.json({ id: data._id });
      }
    }
  );
};

// Get banks
const getBankAccounts = (req, res, next) => {
  BankAccount.find({ active: true })
    .sort("-createdAt")
    .exec((error, banks) => {
      if (error) {
        return res.status(200).json({
          message: "Error fetching bank accounts!",
        });
      } else {
        res.json(banks);
      }
    });
};

// Get banks
const getBankAccountList = (req, res, next) => {
  BankAccount.aggregate([
    { $match: { active: true } },
    {
      $addFields: {
        bankId: { $toObjectId: "$bank" },
      },
    },
    {
      $lookup: {
        from: "bank",
        localField: "bankId",
        foreignField: "_id",
        as: "bank",
      },
    },
    { $unwind: { path: "$bank", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        bank: "$bank.name",
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        _id: 1,
        accountNo: 1,
        accountHolder: 1,
        accountType: 1,
        bank: 1,
        ifsc: 1,
        openingBalance: 1,
      },
    },
  ]).exec((error, banks) => {
    if (error) {
      return res.status(200).json({
        message: "Error fetching bank accounts!",
      });
    } else {
      res.json(banks);
    }
  });
};

// Get a bank
const getBankAccount = (req, res, next) => {
  BankAccount.findById(req.params.id, (error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data);
    }
  });
};

// Add a bank
const addBankAccount = (req, res, next) => {
  const bankAccount = new BankAccount({
    bank: req.body.bank?.trim?.(),
    ifsc: req.body.ifsc?.trim?.(),
    accountType: req.body.accountType,
    accountHolder: req.body.accountHolder?.trim?.(),
    customerId: req.body.customerId,
    accountNo: req.body.accountNo?.trim?.(),
    openingBalance: req.body.openingBalance,
    createdBy: req.body.createdBy,
  });

  BankAccount.find(
    {
      accountNo: {
        $regex: getRegex(req.body.accountNo?.trim?.()),
        $options: "i",
      },
      active: true,
    },
    (error, foundBankAccount) => {
      if (error) {
        return next(error);
      }
      if (foundBankAccount && foundBankAccount.length > 0) {
        let message = `Bank account with account number (${req.body.ifsc}) already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      BankAccount.create(bankAccount, (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  );
};

// Update a bank
const updateBankAccount = (req, res, next) => {
  const _id = req.body._id;
  if (!req.params.id || !_id) {
    return res.status(200).json({ message: "Bank account ID is required!" });
  }
  BankAccount.find(
    {
      accountNo: {
        $regex: getRegex(req.body.accountNo?.trim?.()),
        $options: "i",
      },
      _id: { $ne: _id },
      active: true,
    },
    (error, foundBankAccount) => {
      if (error) {
        return next(error);
      }
      if (foundBankAccount && foundBankAccount.length > 0) {
        let message = `Bank account with account number (${req.body.ifsc}) already exist!`;
        return res.status(200).json({
          message: message,
        });
      }
      BankAccount.findByIdAndUpdate(
        _id,
        {
          $set: {
            bank: req.body.bank?.trim?.(),
            ifsc: req.body.ifsc?.trim?.(),
            accountType: req.body.accountType?.trim?.(),
            accountHolder: req.body.accountHolder?.trim?.(),
            customerId: req.body.customerId,
            accountNo: req.body.accountNo?.trim?.(),
            openingBalance: req.body.openingBalance,
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
  );
};

// Remove a bank
const removeBankAccount = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Bank account ID is required!" });
  }

  BankAccount.findByIdAndUpdate(
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
        res.json({ id: data._id });
      }
    }
  );
};

const getLastEmployee = (req, res) => {
  Employee.findOne({}, {}, { sort: { createdAt: -1 } }, (err, data) => {
    if (err) {
      res.status(200).json({ message: err.message });
    } else {
      res.json(data);
    }
  });
};

const getLastDriver = (req, res) => {
  Driver.findOne({}, {}, { sort: { createdAt: -1 } }, (err, data) => {
    if (err) {
      res.status(200).json({ message: err.message });
    } else {
      res.json(data);
    }
  });
};

const getRateListWithPagination = (req, res) => {
  if (!req.body.pagination.page || !req.body.pagination.limit) {
    return res.status(200).json({ message: "Pagination is required!" });
  }

  const limit = req.body.pagination.limit || 100;
  const start = (req.body.pagination.page - 1) * limit;
  const end = req.body.pagination.page * limit;

  RateMaster.find({ active: true })
    .sort("-createdAt")
    .exec((rmError, rateList) => {
      if (rmError) {
        return res.status(200).json({
          message: rmError.message,
        });
      } else {
        res.json({
          rateList: rateList.slice(start, end),
          count: rateList?.length,
        });
      }
    });
};

const addToRateMaster = (req, res) => {
  if (!req.body.customer && !req.body.customerName) {
    return res.status(200).json({ message: "Customer is required!" });
  }

  RateMaster.findOne(
    {
      customer: {
        $regex: getRegex(req.body.customer?.trim?.()),
        $options: "i",
      },

      active: true,
    },
    (foundErr, foundRateList) => {
      if (foundErr) {
        return res.status(200).json({ message: foundErr.message });
      }
      if (foundRateList) {
        return res.status(200).json({
          message: `Rate list for ${req.body.customerName} already exist!`,
        });
      }
      if (!foundErr && !foundRateList) {
        if (req.body.rates.length) {
          req.body.rates.forEach(async (rate, index) => {
            try {
              const foundArticle = await Article.findOne({
                name: {
                  $regex: getRegex(rate.article?.toUpperCase()?.trim?.()),
                  $options: "i",
                },
              });
              if (foundArticle) {
                rate.article = foundArticle.name?.toUpperCase();
                if (index === req.body.rates.length - 1) {
                  const rateList = new RateMaster({
                    customer: req.body.customer,
                    customerName: req.body.customerName
                      ?.toUpperCase()
                      ?.trim?.(),
                    rates: req.body.rates,
                    createdBy: req.body.createdBy,
                  });
                  RateMaster.create(rateList, (error, data) => {
                    if (error) {
                      if (error.code === 11000) {
                        return res.status(200).json({
                          message: `Rate Master with customer name (${rateList.customerName}) already exist!`,
                        });
                      }
                      return res.status(200).json({ message: error.message });
                    } else {
                      return res.send(data);
                    }
                  });
                }
              } else {
                const article = new Article({
                  name: rate.article?.toUpperCase(),
                  createdBy: req.body.createdBy,
                });
                const createdArticle = await Article.create(article);
                if (createdArticle) {
                  rate.article = createdArticle.name?.toUpperCase();
                  if (index === req.body.rates.length - 1) {
                    const rateList = new RateMaster({
                      customer: req.body.customer,
                      customerName: req.body.customerName
                        ?.toUpperCase()
                        ?.trim?.(),
                      rates: req.body.rates,
                      createdBy: req.body.createdBy,
                    });
                    if (rateList) {
                      RateMaster.create(rateList, (error, data) => {
                        if (error) {
                          return res.status(200).json({
                            message: error.message,
                          });
                        } else {
                          return res.send(data);
                        }
                      });
                    }
                  }
                }
              }
            } catch (e) {
              return res.status(200).json({ message: e.message });
            }
          });
        } else {
          return res
            .status(200)
            .json({ message: "Rate master list is required" });
        }
      }
    }
  );
};

const getCustomersForRateMaster = async (req, res) => {
  try {
    const allRateMaster = await RateMaster.find({ active: true });
    if (allRateMaster && allRateMaster.length) {
      const customers = allRateMaster.map((rate) => rate.customer);
      const foundCustomers = await Customer.find({
        _id: { $nin: customers },
      });
      if (foundCustomers) {
        return res.send(foundCustomers);
      }
    } else {
      const foundCustomers = await Customer.find({});
      if (foundCustomers) {
        return res.send(foundCustomers);
      }
    }
  } catch (e) {
    return res.status(200).json({ message: e.message });
  }
};

const getRateMasterById = async (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Rate master id is required!" });
  }
  try {
    const response = await RateMaster.findById(req.params.id);
    if (response) {
      return res.send(response);
    }
  } catch (e) {
    return res.status(200).json({ message: e.message });
  }
};

const updateRateMaster = (req, res) => {
  if (!req.body.rates.length) {
    return res.status(200).json({ message: "Rate master list is required" });
  }
  if (!req.body._id) {
    return res.status(200).json({ message: "Rate master id is required" });
  }

  RateMaster.findOne(
    {
      customer: {
        $regex: getRegex(req.body.customer?.trim?.()),
        $options: "i",
      },

      active: true,
      _id: { $ne: req.body._id },
    },
    (foundErr, foundRateList) => {
      if (foundErr) {
        return res.status(200).json({ message: foundErr.message });
      }
      if (foundRateList) {
        return res.status(200).json({
          message: `Rate list for ${req.body.customerName} already exist!`,
        });
      }
      const udpatedRates = [];
      req.body.rates.forEach(async (rate) => {
        try {
          const foundArticle = await Article.findOne({
            name: {
              $regex: getRegex(rate.article?.toUpperCase()?.trim?.()),
              $options: "i",
            },
          });
          if (foundArticle) {
            rate.article = foundArticle.name?.toUpperCase();
            udpatedRates.push(rate);
            if (udpatedRates.length === req.body.rates.length) {
              const saveRate = [...udpatedRates];
              RateMaster.findByIdAndUpdate(
                req.body._id,
                {
                  $set: {
                    rates: saveRate,
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
            }
          } else {
            const article = new Article({
              name: rate.article?.toUpperCase(),
              createdBy: req.body.createdBy,
            });
            const createdArticle = await Article.create(article);
            if (createdArticle) {
              rate.article = createdArticle.name?.toUpperCase();
              udpatedRates.push(rate);
            }
            if (udpatedRates.length === req.body.rates.length) {
              const saveRate = [...udpatedRates];
              RateMaster.findByIdAndUpdate(
                req.body._id,
                {
                  $set: {
                    rates: saveRate,
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
            }
          }
        } catch (e) {
          return res.status(200).json({ message: e.message });
        }
      });
    }
  );
};

const getRateMasterByCustomer = async (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "Customer id is required" });
  }
  try {
    const rateMaster = await RateMaster.findOne({ customer: req.params.id });
    return res.send({ rateMaster: rateMaster });
  } catch (e) {
    return res.status(200).json({ message: e.message });
  }
};

// Add a TransactionPrefix
const addTransactionPrefix = (req, res, next) => {
  const transactionPrefix = new TransactionPrefix({
    name: req.body.name?.toUpperCase?.(),
    prefix: req.body.prefix,
    current: 1,
    createdBy: req.body.createdBy,
  });

  TransactionPrefix.findOne(
    {
      name: {
        $regex: getRegex(req.body.name?.trim?.()),
        $options: "i",
      },
    },
    (error, foundPrefix) => {
      if (error) {
        return next(error);
      }
      if (foundPrefix) {
        return res.status(200).json({
          message: `TransactionPrefix with name (${foundPrefix.name}) already exist!`,
        });
      }
      TransactionPrefix.create(transactionPrefix, (error, data) => {
        if (error) {
          return res.send(error);
        } else {
          return res.json(data);
        }
      });
    }
  );
};
const getTransactionPrefix = (req, res, next) => {
  const number = 1;
  LorryReceipt.findOne(
    { lrNo: { $regex: req.params.code?.trim?.() } },
    {},
    { sort: { createdAt: -1 } },
    function (err, lr) {
      if (lr) {
        const currentNum = lr.lrNo?.split("-");
        const numLeadingZeros = parseInt(
          currentNum[currentNum?.length - 1]?.replace(/[^0-9]/g, "")
        );
        return res.send(
          `${req.params.code}-${(numLeadingZeros + 1 + "").padStart(6, "0")}`
        );
      } else {
        return res.send(`${req.params.code}-${(number + "").padStart(6, "0")}`);
      }
    }
  );
};

const getRegex = (str) => `^${str}$`;

module.exports = {
  addBranch,
  getBranches,
  getBranchList,
  getBranch,
  removeBranch,
  updateBranch,
  getPlaces,
  addPlace,
  removePlace,
  updatePlace,
  getPlace,
  addEmployee,
  getEmployees,
  removeEmployee,
  updateEmployee,
  getEmployee,
  getArticles,
  getArticle,
  addArticle,
  removeArticle,
  updateArticle,
  getCustomers,
  getCustomersByBranch,
  getCustomer,
  addCustomer,
  updateCustomer,
  removeCustomer,
  getDrivers,
  getDriver,
  addDriver,
  removeDriver,
  updateDriver,
  getSuppliers,
  getSuppliersByType,
  getSupplier,
  addSupplier,
  updateSupplier,
  removeSupplier,
  getVehicleTypes,
  getVehicleType,
  addVehicleType,
  removeVehicleType,
  updateVehicleType,
  getVehicles,
  getVehicleList,
  getVehicle,
  addVehicle,
  updateVehicle,
  removeVehicle,
  getBanks,
  getBank,
  addBank,
  updateBank,
  removeBank,
  getBankAccounts,
  getBankAccountList,
  getBankAccount,
  addBankAccount,
  updateBankAccount,
  removeBankAccount,
  getLastEmployee,
  getLastDriver,
  getRateListWithPagination,
  addToRateMaster,
  getCustomersForRateMaster,
  getRateMasterById,
  updateRateMaster,
  getRateMasterByCustomer,
  addTransactionPrefix,
  getTransactionPrefix,
};
