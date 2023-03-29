import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { isPerformanceGlitchUser, isProblemUser } from '../utils/Credentials'
import { InventoryData } from '../utils/InventoryData.js'
import InventoryListItem from '../components/InventoryListItem'
import SwagLabsFooter from '../components/Footer'
import HeaderContainer from '../components/HeaderContainer'
import { sortAsc, sortDesc, sortHiLo, sortLoHi } from '../utils/Sorting'
import Select from '../components/Select'
import './Inventory.css'

const Inventory = () => {
  const [inventoryList, setInventoryList] = useState(
    sortAsc(InventoryData, 'name'),
  )
  const [activeOption, setActiveOption] = useState('az')

  const startPerformanceGlitch = (duration) => {
    const start = new Date().getTime()
    while (new Date().getTime() < start + duration) {
      // PageLoad increases
    }
  }

  if (isPerformanceGlitchUser()) {
    startPerformanceGlitch(5000)
  }

  const sortByOption = (event) => {
    if (isProblemUser()) {
      // Bail out now if we're problem user so that we have a behaviour which is broken in Chrome only for sort.
      // select option onclick is not supported in Chrome but works in IE and FF
      return
    }

    setActiveOption(event.target.value)

    switch (event.target.value) {
      case 'az':
        setInventoryList(sortAsc(InventoryData, 'name'))
        break
      case 'za':
        setInventoryList(sortDesc(InventoryData, 'name'))
        break
      case 'hilo':
        setInventoryList(sortHiLo(InventoryData, 'price'))
        break
      case 'lohi':
        setInventoryList(sortLoHi(InventoryData, 'price'))
        break
      default:
        return
    }
  }

  return (
    <div id="page_wrapper" className="page_wrapper">
      <div id="contents_wrapper">
        <HeaderContainer
          secondaryTitle="Products"
          secondaryHeaderBot
          secondaryRightComponent={
            <Select
              activeOption={activeOption}
              options={[
                { key: 'az', value: 'Name (A to Z)' },
                { key: 'za', value: 'Name (Z to A)' },
                { key: 'lohi', value: 'Price (low to high)' },
                { key: 'hilo', value: 'Price (high to low)' },
              ]}
              onChange={sortByOption}
              testId="product_sort_container"
            />
          }
        />
        <div id="inventory_container">
          <div>
            <div id="inventory_container" className="inventory_container">
              <div className="inventory_list">
                {inventoryList.map((item, i) => {
                  return (
                    <InventoryListItem
                      key={item.id}
                      id={item.id}
                      image_url={item.image_url}
                      name={item.name}
                      desc={item.desc}
                      price={item.price}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  )
}

export default withRouter(Inventory)
