var _globalPermissions = [];

var nameIsInPermission = function nameIsInPermission(permissionName) {
  return _globalPermissions.indexOf(permissionName) > -1;
};

var user = {
  setPermissions: function setPermissions(permissions) {
    _globalPermissions = permissions;
  },
  hasPermission: function hasPermission(role) {
    return nameIsInPermission(role);
  }
};

export default user;