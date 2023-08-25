"use strict";

const url = require("url");
const { userDetails } = require("./data-store/data");
const serverless = require("serverless-http");

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.getUser = async (req, res) => {
  let userDetail;
  userDetails.map((user) => {
    if (user.userId === +req.pathParameters.userId) {
      userDetail = user;
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless, Your function getUser executed successfully!",
      data: userDetail,
    }),
  };
};

module.exports.createUser = async (req, res) => {
  const userData = JSON.parse(req.body);
  let uniqueId = userDetails[userDetails.length - 1].userId;
  userDetails.push({
    userId: uniqueId + 1,
    username: userData.username,
    gmail: userData.gmail,
    address: {
      area: userData.address["area"],
      state: userData.address["state"],
      pinCode: userData.address["pinCode"],
    },
  });
  const data = userDetails[userDetails.length - 1];

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Go Serverless, Your function createUser executed successfully!",
      data: data,
    }),
  };
};

module.exports.updateUser = async (req, res) => {
  let responseData;
  let userData = JSON.parse(req.body);
  userDetails.map((user) => {
    if (user.userId === +req.pathParameters.userId) {
      responseData =  {
        username: userData.username,
        gmail: userData.gmail,
        address: {
          area: userData.address["area"],
          state: userData.address["state"],
          pinCode: userData.address["pinCode"],
        },
        updateAt: new Date(),
      };
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless, User updated successfully!",
      data: responseData,
    }),
  };
};

module.exports.deleteUser = async (req, res) => {
  let deletedUser = userDetails.filter(
    (user) => user.userId === +req.pathParameters.userId
  );
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Go Serverless, ${deletedUser[0].userId} user deleted successfully!`
    }),
  };
};

