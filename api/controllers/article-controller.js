exports.getAllArticles = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The article list route is not yet defined',
  });
};

exports.createArticle = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The post route is not yet defined',
  });
};

exports.getArticle = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: `The route for article ${req.params.id} is not yet defined`,
  });
};

exports.updateArticle = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The put route is not yet defined',
  });
};

exports.deleteArticle = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The delete route is not yet defined',
  });
};


