export const getErrorPage = (req, res, next) => {
  res.status(404).render("404", {
    path: "/404",
    pageTitle: "Page not found",
  });
};
