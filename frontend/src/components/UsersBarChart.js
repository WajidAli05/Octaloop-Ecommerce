import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

function UsersBarChart({ users }) {

    //function for getting an array of the last ten day starting from today
    const getLastTenDays = () => {
        const dates = [];
        for (let i = 0; i < 10; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const formatedDate = `${day}/${month}`;
            dates.push(formatedDate);
        }
        return dates;
    }

    //use users to find out the number of users registered everyday for the last ten days 
    //and return an array of the number of users registered each day
    const getUsersRegisteredPerDay = () => {
        const dates = getLastTenDays();
        const usersRegisteredPerDay = dates.map(date => {
            const usersRegistered = users.filter(user => {
                const userDate = new Date(user.createdAt);
                const day = userDate.getDate();
                const month = userDate.getMonth() + 1;
                const formatedDate = `${day}/${month}`;
                return formatedDate === date;
            });
            return usersRegistered.length;
        });
        return usersRegisteredPerDay;
    }


  return (
    <BarChart
    xAxis={[{ scaleType: 'band', data: getLastTenDays() }]}
    series={[{ data: getUsersRegisteredPerDay() }]}
    width={400}
    height={300}
  />
  )
}

export default UsersBarChart
