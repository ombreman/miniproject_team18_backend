const { response } = require("express");
const { User } = require("./models");

// 중복 체크
const accountExist = await User.findOne({  where: { accountId: request.body.accountId }})
return accountExist ? response.send({ accountExist: true }) : response.send({ accountExist: false })