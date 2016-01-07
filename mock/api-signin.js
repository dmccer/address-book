exports.post = function(req, res) {
  setTimeout(function() {
    res.status(200).json({
      code: 0,
      msg: '签到成功'
    });
  }, 2000);
}
