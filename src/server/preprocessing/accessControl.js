const accessControlList = [
  {
    'functionality': 'training',
    'roles': ['lead'],
  },
  {
    'functionality': 'humanError',
    'roles': ['admin'],
  },
  {
    'functionality': 'inbox',
    'roles': ['curator'],
  },
  {
    'functionality': 'userManagement',
    'roles': ['admin'],
  },
  {
    'functionality': 'labelDocument',
    'roles': ['curator'],
  }
]

module.exports = { accessControlList }
