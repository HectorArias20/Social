// const { Component, Children } = window.React;
// const { default: styled } = window.styled;

// const Caret = styled.div`
//   position: absolute;
//   display: block;
//   width: 0;
//   height: 0;
//   border-width: 10px;
//   border-style: solid;
//   border-color: transparent transparent #fff;
//   top: -20px;
//   left: calc(50% - 10px);
//   z-index: 1;
// `;

// const DropdownBackground = styled.div`
//   transform-origin: 0 0;
//   background-color: #fff;
//   border-radius: 4px;
//   overflow: hidden;
//   position: relative;
//   box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
//     0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
// `;

// class DropdownContainer extends Component {
//   render() {
//     return (
//       <div>
//         <Caret />
//         <DropdownBackground>{this.props.children}</DropdownBackground>
//       </div>
//     );
//   }
// }

// const Heading = styled.h3`
//   text-transform: uppercase;
//   font-weight: bold;
//   font-size: 1.1rem;
//   margin-top: 0;
//   margin-bottom: ${props => (props.noMarginBottom ? 0 : "1rem")};
//   color: ${({ color }) => (color ? `var(--${color})` : "var(--blue)")};
// `;

// const HeadingLink = Heading.withComponent("li");

// const LinkList = styled.ul`
//   li {
//     margin-bottom: 1rem;
//   }

//   li:last-of-type {
//     margin-bottom: 0;
//   }

//   margin-left: ${props => (props.marginLeft ? props.marginLeft : 0)};
// `;

// const Icon = styled.div`
//   width: 13px;
//   height: 13px;
//   margin-right: 13px;
//   background-color: var(--blue);
//   opacity: 0.8;
//   display: inline-block;
// `;

// const DropdownSection = styled.div`
//   padding: var(--spacer);
//   position: relative;
//   z-index: 1;
// `;

// const CompanyDropdownEl = styled.div`
//   width: 23rem;
// `;

// const CompanyDropdown = () => {
//   return (
//     <CompanyDropdownEl>
//       <DropdownSection>
//         <ul>
//           <HeadingLink>
//             <a href="/">
//               <Icon /> About Stripe
//             </a>
//           </HeadingLink>
//           <HeadingLink>
//             <a href="/">
//               <Icon />Customers
//             </a>
//           </HeadingLink>
//           <HeadingLink>
//             <a href="/">
//               <Icon />Jobs
//             </a>
//           </HeadingLink>
//           <HeadingLink noMarginBottom>
//             <a href="/">
//               <Icon />Environment
//             </a>
//           </HeadingLink>
//         </ul>
//       </DropdownSection>
//       <DropdownSection>
//         <div>
//           <Heading>
//             <Icon />From the Blog
//           </Heading>
//           <LinkList marginLeft="25px">
//             <li>
//               <a href="/">Stripe Atlas &rsaquo;</a>
//             </li>
//             <li>
//               <a href="/">Stripe Home &rsaquo;</a>
//             </li>
//             <li>
//               <a href="/">Improved Fraud Detection &rsaquo;</a>
//             </li>
//           </LinkList>
//         </div>
//       </DropdownSection>
//     </CompanyDropdownEl>
//   );
// };

// const DevelopersDropdownEl = styled.div`
//   width: 25rem;
// `;

// const Flex = styled.div`
//   display: flex;
//   > div:first-of-type {
//     margin-right: 48px;
//   }
// `;

// const DevelopersDropdown = () => {
//   return (
//     <DevelopersDropdownEl>
//       <DropdownSection>
//         <div>
//           <Heading>Documentation</Heading>
//           <p>Start integrating Stripe&rsquo;s products and tools</p>
//           <Flex>
//             <div>
//               <h4>Get Started</h4>
//               <LinkList>
//                 <li>
//                   <a href="/">Elements</a>
//                 </li>
//                 <li>
//                   <a href="/">Checkout</a>
//                 </li>
//                 <li>
//                   <a href="/">Mobile apps</a>
//                 </li>
//               </LinkList>
//             </div>
//             <div>
//               <h4>Popular Topics</h4>
//               <LinkList>
//                 <li>
//                   <a href="/">Apple Pay</a>
//                 </li>
//                 <li>
//                   <a href="/">Testing</a>
//                 </li>
//                 <li>
//                   <a href="/">Launch Checklist</a>
//                 </li>
//               </LinkList>
//             </div>
//           </Flex>
//         </div>
//       </DropdownSection>
//       <DropdownSection>
//         <ul>
//           <HeadingLink>
//             <a href="/">
//               <Icon /> Full API Reference
//             </a>
//           </HeadingLink>
//           <HeadingLink>
//             <a href="/">
//               <Icon /> API Status
//             </a>
//           </HeadingLink>
//           <HeadingLink noMarginBottom>
//             <a href="/">
//               <Icon /> Open Source
//             </a>
//           </HeadingLink>
//         </ul>
//       </DropdownSection>
//     </DevelopersDropdownEl>
//   );
// };

// const ProductsDropdownEl = styled.div`
//   width: 29rem;
// `;

// const Logo = styled.div`
//   width: 38px;
//   height: 38px;
//   margin-right: 16px;
//   border-radius: 100%;
//   opacity: 0.6;
//   background-color: ${({ color }) => `var(--${color})`};
// `;

// const SubProductsList = styled.ul`
//   li {
//     display: flex;
//     margin-bottom: 1rem;
//   }
//   h3 {
//     margin-right: 1rem;
//     width: 3.2rem;
//     display: block;
//   }
//   a {
//     color: var(--dark-grey);
//   }
// `;

// const ProductsSection = styled.ul`
//   li {
//     display: flex;
//   }
// `;

// const WorksWithStripe = styled.div`
//  border-top: 2px solid #fff;
//   display:flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: var(--spacer);
//   padding-top: var(--spacer);
// }
// h3 {
//   margin-bottom: 0;
// }
// `;

// const ProductsDropdown = () => {
//   return (
//     <ProductsDropdownEl>
//       <DropdownSection>
//         <ProductsSection>
//           <li>
//             <div>
//               <Logo color="blue" />
//             </div>
//             <div>
//               <Heading color="blue">Payments</Heading>
//               <p>A complete payments platform</p>
//             </div>
//           </li>
//           <li>
//             <div>
//               <Logo color="green" />
//             </div>
//             <div>
//               <Heading color="green">Billing</Heading>
//               <p>Build and scale your recurring business model</p>
//             </div>
//           </li>
//           <li>
//             <div>
//               <Logo color="teal" />
//             </div>
//             <div>
//               <Heading color="teal">Connect</Heading>
//               <p style={{ marginBottom: 0 }}>
//                 Everything platforms need to get sellers paid
//               </p>
//             </div>
//           </li>
//         </ProductsSection>
//       </DropdownSection>
//       <DropdownSection>
//         <SubProductsList>
//           <li>
//             <Heading noMarginBottom>Sigma</Heading>
//             <div>Your business data at your fingertips.</div>
//           </li>
//           <li>
//             <Heading noMarginBottom>Atlas</Heading>
//             <div>The best way to start an internet business.</div>
//           </li>
//           <li>
//             <Heading noMarginBottom>Radar</Heading>
//             <div>Fight fraud with machine learning.</div>
//           </li>
//         </SubProductsList>
//         <WorksWithStripe>
//           <Heading noMarginBottom>
//             <a href="/">
//               <Icon /> Works with Stripe
//             </a>
//           </Heading>
//         </WorksWithStripe>
//       </DropdownSection>
//     </ProductsDropdownEl>
//   );
// };

// const NavbarItemTitle = styled.button`
//   background: transparent;
//   border: 0;
//   font-weight: bold;
//   font-size: 18px;
//   padding: 1.5rem 1.5rem 1.2rem 1.5rem;
//   color: white;
//   font-family: inherit;
//   display: flex;
//   justify-content: center;
//   transition: opacity 250ms;
//   cursor: pointer;
//   /* position above the dropdown, otherwise the dropdown will cover up the bottom sliver of the buttons */
//   position: relative;
//   z-index: 2;
//   &:hover,
//   &:focus {
//     opacity: 0.7;
//     outline: none;
//   }
// `;
// const NavbarItemEl = styled.li`
//   position: relative;
//   margin-left: 0.5rem;
//   &::first-of-type {
//     margin-left: 0;
//   }
// `;

// const DropdownSlot = styled.div`
//   position: absolute;
//   left: 50%;
//   transform: translateX(-50%);
//   perspective: 1000px;
// `;

// class NavbarItem extends Component {
//   onMouseEnter = () => {
//     this.props.onMouseEnter(this.props.index);
//   };

//   render() {
//     const { title, children } = this.props;
//     return (
//       <NavbarItemEl onMouseEnter={this.onMouseEnter} onFocus={this.onMouseEnter}>
//         <NavbarItemTitle>{title}</NavbarItemTitle>
//         <DropdownSlot>{children}</DropdownSlot>
//       </NavbarItemEl>
//     );
//   }
// }

// const NavbarEl = styled.nav`
//   margin: 0 auto;
// `;

// const NavbarList = styled.ul`
//   display: flex;
//   justify-content: center;
//   list-style: none;
//   margin: 0;
// `;

// class Navbar extends Component {
//   render() {
//     const { children, onMouseLeave } = this.props;
//     return (
//       <NavbarEl onMouseLeave={onMouseLeave}>
//         <NavbarList>{children}</NavbarList>
//       </NavbarEl>
//     );
//   }
// }

// const navbarConfig = [
//   { title: "Products", dropdown: ProductsDropdown },
//   { title: "Developers", dropdown: DevelopersDropdown },
//   { title: "Company", dropdown: CompanyDropdown }
// ];

// export default function MenuComponent() {
//   let state = {
//     activeIndices: []
//   };

//   const onMouseEnter = i => {
//     if (this.state.activeIndices[this.state.activeIndices.length - 1] === i)
//       return
//     this.setState(prevState => ({
//       activeIndices: prevState.activeIndices.concat(i)
//     }));
//   };

//   const onMouseLeave = () => {
//     this.setState({
//       activeIndices: []
//     });
//   };

  
//     let CurrentDropdown;

//     const currentIndex = this.state.activeIndices[
//       this.state.activeIndices.length - 1
//     ];

//     if (typeof currentIndex === "number")
//       CurrentDropdown = navbarConfig[currentIndex].dropdown;

//     return (
//       <Navbar onMouseLeave={this.onMouseLeave}>
//         {navbarConfig.map((n, index) => {
//           return (
//             <NavbarItem
//               title={n.title}
//               index={index}
//               onMouseEnter={this.onMouseEnter}
//             >
//               {currentIndex === index && (
//                 <DropdownContainer>
//                   <CurrentDropdown />
//                 </DropdownContainer>
//               )}
//             </NavbarItem>
//           );
//         })}
//       </Navbar>
//     );
  
// }

// const AppContainer = styled.div`
//   background: #53f;
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;

//   > div:first-of-type {
//     flex: 1 0 70vh;
//   }
// `;

