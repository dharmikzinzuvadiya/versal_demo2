import logo from './logo.svg';
import './App.css';
// import { useState } from "react";
// import React, { useState } from 'react';
import { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
let index = 0;


function App() {
  const [person, setPerson] = useState({
    billedto: "",
    discription: "",
    rate: "",
    Quantity: "",
    amt: "",
    invoicedate: "",
  });

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("new")) || []
  );
// for input
  const handleOnChange = (e) => {
    console.log(e.target.name);
    setPerson({ ...person, [e.target.name]: e.target.value });
  };
// for submit button
  const handleSubmit = () => {
    setData([...data, person]);
    localStorage.setItem("new", JSON.stringify([...data, person]));
  };

// for delete button 
  const handleDelete = (index) => {
    const newData = data.filter((item, i) => i !== index);
    setData(newData);
    localStorage.setItem("new", JSON.stringify(newData));
  };

  // for select button
  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');
  const inputRef = useRef("");
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  

  console.log(person);
  console.log(data);

  return (
    <div className="App">



      <div className='bod'></div>

      <div className='invoice'>
        <h2>BILLED TO:</h2>
        <div class="invoiceformate" >
          <div>
            <div>
              <input
                type="text"
                id="billedto"
                name="billedto"
                placeholder='customer name'
                onChange={(e) => handleOnChange(e)}
                value={person.billedto}
              />
            </div>{" "}
            <div>
              <input
                type="date"
                id="invoicedate"
                name="invoicedate"
                placeholder='Date'
                onChange={(e) => handleOnChange(e)}
                value={person.invoicedate}
              />
              </div>{" "}
          </div>
          <div>
          <Select
      style={{
        width: 300,
      }}
      placeholder="custom dropdown render"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({
        label: item,
        value: item,
      }))}
    />
          </div>{" "}
          <div>
            <input
              type="text"
              id="rate"
              name="rate"
              placeholder='price per item'
              onChange={(e) => handleOnChange(e)}
              value={person.rate}
            />
          </div>{" "}
          <div>
            <input
              type="text"
              id="Quantity"
              name="Quantity"
              placeholder='Quantity'
              onChange={(e) => handleOnChange(e)}
              value={person.Quantity}
            />
          </div>{" "}
          <div>
            <input
              type="text"
              id="amt"
              name="amt"
              placeholder='Total amount'
              onChange={(e) => handleOnChange(e)}
              value={person.amt}
            />
          </div>{" "}
        </div>
        <div>
          {/* for total amount */}
        </div>
        <div>
          <button onClick={handleSubmit}>Submitt</button>
        </div>

      </div>


      <div className="billformat">

        <div className='bill shadow-2xl'>
          <div class="box1">
            <h1>Company Name</h1>
            <h1>INVOICE</h1>
          </div>
          <div class="box2">
            <p className='location'>Empire State Building is located at 40.7 degrees north, 74 degrees west.</p>
          </div>

          <div className='box3'>
            <table>
              <thead>
                <th>Customer name</th>
                <th>Invoice Date:</th>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr>
                      <td>{item?.billedto}</td>
                      <td>{item?.invoicedate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className='invoice-details'>
            <table>
              <tbody>
                <thead>
                  <th className='pro'>product</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </thead>
              </tbody>

              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr>
                      <td>{item?.discription}
                        <button onClick={() => handleDelete(index)}>Delete</button>
                      </td>
                      <td>{item?.Quantity}</td>
                      <td>{item?.amt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>




    </div>




  );
}

export default App;
