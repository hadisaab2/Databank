
export const countries = ['Lebanon', 'Syria', 'Jordan']


export const interestsoptions = [
    { value: 'Social Network', label: 'Social Network', isFixed: true },
    { value: "Women's Fashion", label: "Women's Fashion", isFixed: true },
    { value: 'Luxury Stores', label: 'Luxury Stores', isFixed: true },
    { value: 'Luxury Stores4', label: 'Luxury Stores4', isFixed: true },
    { value: 'Luxury Stores3', label: 'Luxury Stores3', isFixed: true },
    { value: 'Luxury Stores2', label: 'Luxury Stores2', isFixed: true },
    { value: 'Luxury Stores1', label: 'Luxury Stores1', isFixed: true }

  ]
//table columns
export const multiLingColumns = [
    {
      name: "id",
      sortable: true,
      minWidth: "50px",
      selector: (row) => row.id
    },
    {
      name: "phonenumber",
      sortable: true,
      minWidth: "50px",
      selector: (row) => row.phonenumber
    },
    {
      name: "customerinterests",
      sortable: true,
      minWidth: "50px",
      selector: (row) => row.customerinterests
    },
    {
      name: "country",
      sortable: true,
      minWidth: "50px",
      selector: (row) => row.country
    }
  ]