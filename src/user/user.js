let _globalPermissions = []

const nameIsInPermission = (permissionName) => {
  return _globalPermissions.indexOf(permissionName) > -1
}

let user = {
  setPermissions:(permissions) => {
    _globalPermissions = permissions
  },
  hasPermission: (role) => {
    return nameIsInPermission(role)
  }
}

export default user
