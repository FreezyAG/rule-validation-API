const errorHandler = async (error, _req, res, _next) => {
  const { data } = error;

  res.status(400).json({
    message: data || 'Invalid JSON payload passed.',
    status: 'error',
    data: null,
  });
};

module.exports = errorHandler;
