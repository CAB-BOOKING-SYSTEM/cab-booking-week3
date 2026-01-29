// //class components tối thiểu
// // import React, { Component } from 'react';

// // class Header extends Component {
// //   render() {
// //     return <h1>Hello Header</h1>;
// //   }
// // }

// // export default Header;

// //class components đầy đủ hơn
// // import React, { Component } from "react";
// // class Header extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       title: "Hello Header",
// //       count: 0
// //     };
// //   }
// //   handleClick = () => {
// //     this.setState({ count: this.state.count + 1 });
// //   };
// //   render() {
// //     return (
// //       <div>
// //         <h1>{this.state.title}</h1>
// //         <p>Clicked: {this.state.count} times</p>
// //         <button onClick={this.handleClick}>Click me</button>
// //       </div>
// //     );
// //   }
// // }
// // export default Header;

// import React, {Component} from "react";

// class Header extends Component{
  
//   constructor(prop){
//     super(prop);
//     this.state={
//       title:"Hello",
//       count:0
//     };
//   }
  
//   handleClick=()=>{
//     this.setState({count:this.state.count+1});
//   }
  
//   componentDidMount() {
//     console.log("Header đã được render xong");
//   }
  
// componentDidUpdate() {
//     console.log("Header đã được cập nhật");
//   }
//   render(){
//     return (
//       <div>
//         <h1>{this.state.title}</h1>
//           <p>Số lần click:{this.state.count}</p>
//         <button onClick={this.handleClick}>Clickme</button>
//       </div>
//     );
//   }
// }
// export default Header;