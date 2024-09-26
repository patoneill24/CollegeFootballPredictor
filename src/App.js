import './App.css';
import { useState } from 'react';

const user = {
  name: 'John Doe',
  imageURL: 'https://i.imgur.com/yXOvdOSs.jpg',
  imgSize: 90,
};

const products = [
  {title: 'React', price: 100,isGood: true},
  {title: 'Angular', price: 100, isGood: false},
  {title: 'Vue', price: 100, isGood: true},
];

function Product({title, price, isGood}){
  return (
    <div>
      <h2
      style={{color: isGood? 'green': 'red'}}
      >{title}
      </h2>
      <p>${price}</p>
    </div>
  );
}

function Profile(){
  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.imageURL} 
      className="avatar"
      alt={'Photo of ' + user.name} 
      style = {{
      width: user.imgSize,
      height: user.imgSize
      }}/>
    </div>
  );
}

function MyButton(){
  function handleClick(){
    alert('You Clicked me!');
  }
  return (
    <button onClick={handleClick}>Click me</button>
  );
}

function ButtonCounter({count, onClick}){
  return (
    <div>
      <button onClick= {onClick}>Clicked {count} times</button>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  function handleClick(){
    setCount(count + 1);
  }
  return (
    <div className="App">
      <Profile/>
      {products.map(product => (
        <Product title={product.title} price={product.price} isGood = {product.isGood}/>
      ))}
      <MyButton/>
      <ButtonCounter count= {count} onClick={handleClick}/>
      <ButtonCounter count={count} onClick={handleClick}/>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
