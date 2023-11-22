const jwt = require("jsonwebtoken");
const secrets = require("../secrets/secrets");
const User = require("../models/User.js");
const Employee = require("../models/Employee.js");
const Branch = require("../models/Branch.js");
const { ObjectId } = require("mongodb");

const signupAdminCtrl = (req, res) => {
  const user = new User({
    type: req.body.type,
    username: req.body.username,
    password: req.body.password,
    createdBy: "system",
  });

  User.findOne(
    {
      type: {
        $regex: getRegex(req.body.type?.trim?.()),
        $options: "i",
      },

      username: {
        $regex: getRegex(req.body.username?.trim?.()),
        $options: "i",
      },
    },
    (error, foundUser) => {
      if (error) {
        return next(error);
      }
      if (foundUser) {
        return res.status(200).json({
          message: "User already exist!",
        });
      }
      User.create(user, (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  );
};

const signupCtrl = (req, res, next) => {
  const user = new User({
    branch: req.body.branch,
    type: req.body.type,
    employee: req.body.employee,
    username: req.body.username,
    password: req.body.password,
    createdBy: req.body.createdBy,
  });

  User.findOne(
    {
      username: {
        $regex: getRegex(req.body.username?.trim?.()),
        $options: "i",
      },

      employee: {
        $regex: getRegex(req.body.employee?.trim?.()),
        $options: "i",
      },

      branch: {
        $regex: getRegex(req.body.branch),
        $options: "i",
      },

      type: {
        $regex: getRegex(req.body.type?.trim?.()),
        $options: "i",
      },
    },
    (error, foundUser) => {
      if (error) {
        return next(error);
      }
      if (foundUser) {
        return res.status(200).json({
          message: "User already exist!",
        });
      }
      User.create(user, (error, data) => {
        if (error) {
          if (error.code === 11000) {
            return res.status(200).json({
              message: `User with username (${req.body.username}) already exist!`,
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

const getUsers = (req, res) => {
  // User.find({ active: true }, (error, users) => {
  //   if (error) {
  //     return res.status(200).json({
  //       message: "Error fetching users!",
  //     });
  //   } else {
  //     const updatedUsers = [];
  //     users.forEach((user) => {
  //       if (user && user.type && user.type.toLowerCase() !== "superadmin") {
  //         const updatedUser = {
  //           branch: user.branch,
  //           employee: user.employee,
  //           type: user.type,
  //           username: user.username,
  //           id: user._id,
  //           permissions: user.permissions,
  //         };
  //         updatedUsers.push(updatedUser);
  //       }
  //     });
  //     res.json(updatedUsers);
  //   }
  // });

  User.aggregate([
    { $match: { active: true } },
    { $sort: { createdAt: -1 } },
    {
      $addFields: {
        convertedBranchId: { $toObjectId: "$branch" },
      },
    },
    {
      $addFields: {
        convertedEmployeeId: { $toObjectId: "$employee" },
      },
    },
    {
      $lookup: {
        from: "branch",
        localField: "convertedBranchId",
        foreignField: "_id",
        as: "Branch",
      },
    },
    {
      $lookup: {
        from: "employee",
        localField: "convertedEmployeeId",
        foreignField: "_id",
        as: "Employee",
      },
    },
  ]).exec(function (error, users) {
    if (error) {
      return res.status(200).json({
        message: "Error fetching users!",
      });
    } else {
      const updatedUsers = [];
      users.forEach((user) => {
        if (user && user.type && user.type.toLowerCase() !== "superadmin") {
          const updatedUser = {
            branch: user.Branch[0]?.name || "",
            employee: user.Employee[0]?.name || "",
            type: user.type,
            username: user.username,
            id: user._id,
            permissions: user.permissions,
          };
          updatedUsers.push(updatedUser);
        }
      });
      res.json(updatedUsers);
    }
  });
};

const userRegister = (req, res) => {
  User.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $addFields: {
        convertedBranchId: { $toObjectId: "$branch" },
      },
    },
    {
      $addFields: {
        convertedEmployeeId: { $toObjectId: "$employee" },
      },
    },
    {
      $addFields: {
        convertedCreatedById: {
          $cond: {
            if: {
              $ne: ["$createdBy", "system"],
            },
            then: { $toObjectId: "$createdBy" },
            else: null,
          },
        },
      },
    },
    {
      $lookup: {
        from: "branch",
        localField: "convertedBranchId",
        foreignField: "_id",
        as: "Branch",
      },
    },
    {
      $lookup: {
        from: "employee",
        localField: "convertedEmployeeId",
        foreignField: "_id",
        as: "Employee",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "convertedCreatedById",
        foreignField: "_id",
        as: "User",
      },
    },
  ]).exec(function (error, users) {
    if (error) {
      return res.status(200).json({
        message: "Error fetching users!",
      });
    } else {
      const updatedUsers = [];
      users.forEach((user, index) => {
        if (user.type.toLowerCase() !== "superadmin") {
          const updatedUser = {
            branch: user.Branch[0]?.name || "",
            employee: user.Employee[0]?.name || "",
            username: user.username,
            active: user.active,
            createdBy: user.User[0]?.username,
            createdAt: getFormattedDate(user.createdAt),
            id: index + 1,
          };
          updatedUsers.push(updatedUser);
        }
      });
      res.json(updatedUsers);
    }
  });
};

const getUser = (req, res, next) => {
  User.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "branch",
        localField: "userBranches",
        foreignField: "_id",
        as: "userBranches",
      },
    },
  ]).exec((error, data) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(data[0]);
    }
  });
};

const getUsersByBranch = (req, res, next) => {
  // User.find({ branch: req.params.id, active: true }, (error, users) => {
  //   if (error) {
  //     return res.status(200).json({
  //       message: "Error fetching users!",
  //     });
  //   } else {
  //     const updatedUsers = [];
  //     users.forEach((user) => {
  //       const updatedUser = {
  //         branch: user.branch,
  //         employee: user.employee,
  //         type: user.type,
  //         username: user.username,
  //         id: user._id,
  //         permissions: user.permissions,
  //       };
  //       updatedUsers.push(updatedUser);
  //     });
  //     res.json(updatedUsers);
  //   }
  // });

  User.aggregate([
    { $match: { active: true, branch: req.params.id } },
    {
      $addFields: {
        convertedBranchId: { $toObjectId: "$branch" },
      },
    },
    {
      $addFields: {
        convertedEmployeeId: { $toObjectId: "$employee" },
      },
    },
    {
      $lookup: {
        from: "branch",
        localField: "convertedBranchId",
        foreignField: "_id",
        as: "Branch",
      },
    },
    {
      $lookup: {
        from: "employee",
        localField: "convertedEmployeeId",
        foreignField: "_id",
        as: "Employee",
      },
    },
  ]).exec(function (error, users) {
    if (error) {
      return res.status(200).json({
        message: "Error fetching users!",
      });
    } else {
      const updatedUsers = [];
      users.forEach((user) => {
        if (user && user.type && user.type.toLowerCase() !== "superadmin") {
          const updatedUser = {
            branch: user.Branch[0]?.name || "",
            employee: user.Employee[0] || {},
            type: user.type,
            username: user.username,
            id: user._id,
            permissions: user.permissions,
          };
          updatedUsers.push(updatedUser);
        }
      });
      res.json(updatedUsers);
    }
  });
};

const updateUserPermissions = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.id,
    {
      $set: {
        permissions: req.body.permissions,
        updatedBy: req.body.updatedBy,
        userBranches: req.body.userBranches,
      },
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

const removeUser = (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({ message: "User ID is required!" });
  }

  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        active: false,
        updatedBy: req.body.updatedBy,
      },
    },
    (error, data) => {
      if (error) {
        res.status(200).json({ message: error.message });
      } else {
        res.json({ id: data._id });
      }
    }
  );
};

const updateUser = (req, res, next) => {
  const _id = req.body._id;

  User.findOne(
    {
      username: {
        $regex: getRegex(req.body.username?.trim?.()),
        $options: "i",
      },
      employee: {
        $regex: getRegex(req.body.employee?.trim?.()),
        $options: "i",
      },
      branch: {
        $regex: getRegex(req.body.branch),
        $options: "i",
      },

      type: {
        $regex: getRegex(req.body.type?.trim?.()),
        $options: "i",
      },
      _id: { $ne: _id },
    },
    (error, foundUser) => {
      if (error) {
        return next(error);
      }
      if (foundUser) {
        return res.status(200).json({
          message: "User already exist!",
        });
      }
      User.findOneAndUpdate(
        { _id },
        {
          $set: {
            permissions: req.body.permissions,
            branch: req.body.branch,
            password: req.body.password,
            type: req.body.type,
            employee: req.body.employee,
            updatedBy: req.body.updatedBy,
          },
        },
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

const loginCtrl = async (req, res, next) => {
  User.findOne(
    { username: req.body.username?.trim?.() },
    (error, foundUser) => {
      if (error) {
        return next(error);
      }
      if (foundUser) {
        if (!foundUser.active) {
          return res.status(200).json({
            message: "User is not active!",
          });
        }
        if (req.body.password !== foundUser.password) {
          return res.status(200).json({
            message: "Wrong password!",
          });
        } else {
          const updatedUser = JSON.parse(JSON.stringify(foundUser));

          const token = jwt.sign(
            {
              username: updatedUser.username,
              userId: updatedUser._id,
              type: updatedUser.type,
            },
            secrets.authKey
          );

          updatedUser.token = token;

          Employee.findById(updatedUser.employee, (findEmpErr, findEmpData) => {
            if (findEmpErr) {
              return res.status(200).json({ message: findEmpErr.message });
            }
            updatedUser.employee = findEmpData;
            delete updatedUser.password;
            if (foundUser.branch) {
              Branch.findById(
                foundUser.branch,
                (userBranchErr, userBranchData) => {
                  if (userBranchErr) {
                    return res
                      .status(200)
                      .json({ message: userBranchErr.message });
                  }
                  if (userBranchData._id) {
                    updatedUser.branchData = userBranchData;
                    return res.json(updatedUser);
                  }
                  return res.json(updatedUser);
                }
              );
            } else {
              return res.json(updatedUser);
            }
          });
        }
      }
      if (!error && !foundUser) {
        return res.status(200).json({
          message: "User not found!",
        });
      }
    }
  );
};

const getSearchedUsers = (req, res, next) => {
  if (!req.body.search) {
    return getUsers(req, res, next);
  }
  const expression = new RegExp(req.body.search);
  User.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $addFields: {
        convertedBranchId: { $toObjectId: "$branch" },
      },
    },
    {
      $addFields: {
        convertedEmployeeId: { $toObjectId: "$employee" },
      },
    },
    {
      $lookup: {
        from: "branch",
        localField: "convertedBranchId",
        foreignField: "_id",
        as: "Branch",
      },
    },
    {
      $lookup: {
        from: "employee",
        localField: "convertedEmployeeId",
        foreignField: "_id",
        as: "Employee",
      },
    },
    { $unwind: { path: "$Branch", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$Employee", preserveNullAndEmptyArrays: true } },
    {
      $match: {
        active: true,
        $or: [
          {
            ["Branch.name"]: {
              $regex: expression,
              $options: "i",
            },
          },
          {
            ["Employee.name"]: {
              $regex: expression,
              $options: "i",
            },
          },
          {
            type: {
              $regex: expression,
              $options: "i",
            },
          },
          {
            username: {
              $regex: expression,
              $options: "i",
            },
          },
        ],
      },
    },
  ]).exec(function (error, users) {
    if (error) {
      return res.status(200).json({
        message: "Error fetching users!",
      });
    } else {
      const updatedUsers = [];
      users.forEach((user) => {
        if (user && user.type && user.type.toLowerCase() !== "superadmin") {
          const updatedUser = {
            branch: user.Branch?.name || "",
            employee: user.Employee?.name || "",
            type: user.type,
            username: user.username,
            id: user._id,
            permissions: user.permissions,
          };
          updatedUsers.push(updatedUser);
        }
      });
      res.json(updatedUsers);
    }
  });
};

const getRegex = (str) => `^${str}$`;
const getFormattedDate = (date) => {
  const day = new Date(date)?.getDate();
  const month = new Date(date)?.getMonth() + 1;
  const year = new Date(date)?.getFullYear();
  return `${("0" + day).slice(-2)}-${("0" + month).slice(-2)}-${year}`;
};
module.exports = {
  signupAdminCtrl,
  signupCtrl,
  loginCtrl,
  getUsers,
  updateUserPermissions,
  removeUser,
  getUser,
  getUsersByBranch,
  userRegister,
  updateUser,
  getSearchedUsers,
};
