export const dummyData = [
  {
    id: "1",
    name: "John Brown",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "2",
    name: "Jim Green",
    amount: 42,
    date: Date.now(),
  },
  {
    id: "3",
    name: "Joe Black",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "4",
    name: "Sheily Black",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "5",
    name: "Deroc Black",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "6",
    name: "Stirley Black",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "7",
    name: "Shelby Black",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "8",
    name: "Shelby Black",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "9",
    name: "Shelby Black",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "10",
    name: "Shelby Black",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "11",
    name: "Shelby Black",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "12",
    name: "Shelby Black",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "13",
    name: "Shelby Black",
    amount: 32,
    date: Date.now(),
  },
  {
    id: "14",
    name: "Shelby Black",
    amount: 32,
    date: Date.now(),
  },
];
export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    sorter: true,
  },
  {
    title: "Date Paid",
    dataIndex: "datePaid",
    key: "datePaid",
    sorter: true,
    render: (datePaid: string) => new Date(datePaid).toLocaleDateString(),
  },
];
