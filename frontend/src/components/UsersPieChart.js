import React from 'react'
//import Material UI charts
import { PieChart } from '@mui/x-charts/PieChart';

function UsersPieChart({users}) {

    
    //total pending users
    const totalPendingUsers = users.filter(user => user.isApprovedByAdmin === false).length;

    //total approved users
    const totalApprovedUsers = users.filter((user)=> user.isApprovedByAdmin ===true).length;

    //data for the pie chart
    const usersSeries = [
      {
        data: [
          { id: 0, value: totalApprovedUsers, label: 'Approved Users' },
          { id: 1, value: totalPendingUsers, label: 'Pending Users' },
        ],
      },
    ];
  return (
    <PieChart
      series={usersSeries}
      width={450}
      height={200}
    />
  )
}

export default UsersPieChart
