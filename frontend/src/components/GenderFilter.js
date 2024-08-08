import React , { useState } from 'react'
import { Tooltip } from '@mui/material';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import ManIcon from '@mui/icons-material/Man';
import GirlIcon from '@mui/icons-material/Girl';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';


function ProductGenderFilter({onMenProducts , onWomenProducts , onKidsProducts , onShowAllProducts }) {
    const [isAllActive , setIsAllActive] = useState(true);
    const [isMenActive , setIsMenActive] = useState(false);
    const [isWomenActive , setIsWomenActive] = useState(false);
    const [isKidsActive , setIsKidsActive] = useState(false);


  return (
      <div className='container gender-filter-div'>
      <div className='filters-container'>
        <Tooltip title='All' placement='top' arrow>
          <button className={`filter-btn ${isAllActive ? 'active' : ''}`} 
            onClick={()=> {
                setIsAllActive(!isAllActive);
                setIsMenActive(false);
                setIsWomenActive(false);
                setIsKidsActive(false);
                onShowAllProducts();
            }}
            >All
            <FamilyRestroomIcon fontSize='small' />
            </button>
        </Tooltip>

        <Tooltip title='Men' placement='top' arrow>
          <button className={`filter-btn ${isMenActive ? 'active' : ''}`} 
                    onClick={()=> {
                        setIsMenActive(!isMenActive);
                        setIsAllActive(false);
                        setIsWomenActive(false);
                        setIsKidsActive(false);
                        onMenProducts();
                    }}
            >Men 
            <ManIcon fontSize='small' /> 
            </button>
        </Tooltip>

        <Tooltip title='Women' placement='top' arrow> 
          <button className={`filter-btn ${isWomenActive ? 'active' : ''}`} 
                    onClick={()=> {
                        setIsWomenActive(!isWomenActive);
                        setIsAllActive(false);
                        setIsMenActive(false);
                        setIsKidsActive(false);
                        onWomenProducts();    
                    }}
          >Women 
          <GirlIcon fontSize='medium' />
          </button>
        </Tooltip>

        <Tooltip title='Kids' placement='top' arrow> 
          <button className={`filter-btn ${isKidsActive ? 'active' : ''}`}
                    onClick={()=> {
                        setIsKidsActive(!isKidsActive);
                        setIsAllActive(false);
                        setIsMenActive(false);
                        setIsWomenActive(false);
                        onKidsProducts();
                    }}
          >Kids
          <EscalatorWarningIcon fontSize='small' />
          </button>
        </Tooltip>
    </div>
    </div>
  )
}

export default ProductGenderFilter
