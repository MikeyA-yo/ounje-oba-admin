export const login = "/auth/login/";

export const refresh = "/auth/refresh-token/";

export const logout = "/auth/logout/";

export const products = "/admin/products/";

export const productsStats = "/admin/products/dashboard_stats/";

export const productsBulkUpload = "/admin/products/bulk_upload/";

export const productsBulkUpdate = "/admin/products/bulk_update_stock/";

export const productsBulkToggle = "/admin/products/bulk_feature_toggle/";

export const productsId = (id: string) => `/admin/products/${id}/`;

export const productsIdDuplicate = (id: string) =>
  `/admin/products/${id}/duplicate/`;

export const productManagement = "/admin/product-management/";

export const productManagementId = (id: string) =>
  `/admin/product-management/${id}/`;

export const productManagementIdCalculate = (id: string) =>
  `/admin/product-management/${id}/calculate_price/`;

export const orderManagement = "/admin/order-management/";

export const orderManagementStats = "/admin/order-management/dashboard_stats/";

export const orderManagementId = (id: string) =>
  `/admin/order-management/${id}/`;

export const orderManagementIdAssign = (id: string) =>
  `/admin/order-management/${id}/assign_order/`;

export const orderManagementIdFlag = (id: string) =>
  `/admin/order-management/${id}/flag_order/`;

export const orderManagementIdUnflag = (id: string) =>
  `/admin/order-management/${id}/unflag_order/`;

export const orderManagementIdStatus = (id: string) =>
  `/admin/order-management/${id}/update_status/`;

export const coupons = "/admin/coupons/";

export const couponsId = (id: string) => `/admin/coupons/${id}/`;

export const couponsIdValidate = (id: string) =>
  `/admin/coupons/${id}/validate/`;

export const specialDeals = "/admin/special-deals/";

export const specialDealsId = (id: string) => `/admin/special-deals/${id}/`;

export const specialDealsIdValidate = (id: string) =>
  `/admin/special-deals/${id}/validate_products/`;

export const categories = "/products/categories/";

export const downloadTemplate = "/admin/products/download_sample_csv/";
