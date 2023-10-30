import { vendordata } from '@/temp/vendordata';
import React from 'react';
import MenuCard from '../menucard';

const Menulist = ({ vendorid }: any) => {
  const vendor = vendordata[vendorid];
  const menulist = vendor?.menulist || [];

  console.log(menulist);
  return (
    <div>
      {menulist.map((menu) => (
        <MenuCard key={menu.id} vendorid={vendorid} menuid={menu.id} />
      ))}
    </div>
  );
};

export default Menulist;
