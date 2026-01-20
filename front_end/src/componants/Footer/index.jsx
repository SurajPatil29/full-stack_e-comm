import { LiaShippingFastSolid } from "react-icons/lia";
import { IoWalletOutline } from "react-icons/io5";
import { GrGift } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { Link } from "react-router-dom";
import { PiChats } from "react-icons/pi";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { FaPinterestP } from "react-icons/fa";

function Footer() {
	// this is footer componant this include multiple links
	return (
		<>
			<footer className="py-6 bg-[#fafafa]">
				<hr />
				<div className="container py-4 ">
					<div
						className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-5
      gap-6
      text-black
      px-4
      sm:px-10
      lg:px-20
    "
					>
						{/* this div contain info about site */}
						<div className="col flex items-center justify-center flex-col group">
							<LiaShippingFastSolid
								className="
  text-[40px]
  sm:text-[45px]
  md:text-[50px]
  lg:text-[60px]
  transition-all
  duration-300
  group-hover:text-[#ff5151]
  group-hover:-translate-y-1
"
							/>
							<h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-[500] text-center">
								Free Shipping
							</h3>
							<p className="text-[12px] sm:text-[13px] font-[400] text-center">
								For all Order Over $100
							</p>
						</div>
						<div className="col flex items-center justify-center flex-col group">
							<GiReturnArrow
								className="
  text-[40px]
  sm:text-[45px]
  md:text-[50px]
  lg:text-[60px]
  transition-all
  duration-300
  group-hover:text-[#ff5151]
  group-hover:-translate-y-1
"
							/>
							<h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-[500] text-center">
								30 Days Returns
							</h3>
							<p className="text-[12px] sm:text-[13px] font-[400] text-center">
								For an Exchange Product
							</p>
						</div>
						<div className="col flex items-center justify-center flex-col group">
							<IoWalletOutline
								className="
  text-[40px]
  sm:text-[45px]
  md:text-[50px]
  lg:text-[60px]
  transition-all
  duration-300
  group-hover:text-[#ff5151]
  group-hover:-translate-y-1
"
							/>
							<h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-[500] text-center">
								Secured Payment
							</h3>
							<p className="text-[12px] sm:text-[13px] font-[400] text-center">
								Payment Cards Accepted
							</p>
						</div>
						<div className="col flex items-center justify-center flex-col group">
							<GrGift
								className="
  text-[40px]
  sm:text-[45px]
  md:text-[50px]
  lg:text-[60px]
  transition-all
  duration-300
  group-hover:text-[#ff5151]
  group-hover:-translate-y-1
"
							/>
							<h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-[500] text-center">
								Special Gifts
							</h3>
							<p className="text-[12px] sm:text-[13px] font-[400] text-center">
								Our First Product Order
							</p>
						</div>
						<div className="col flex items-center justify-center flex-col group">
							<BiSupport
								className="
  text-[40px]
  sm:text-[45px]
  md:text-[50px]
  lg:text-[60px]
  transition-all
  duration-300
  group-hover:text-[#ff5151]
  group-hover:-translate-y-1
"
							/>
							<h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-[500] text-center">
								Support 24/7
							</h3>
							<p className="text-[12px] sm:text-[13px] font-[400] text-center">
								Contact us Anytime
							</p>
						</div>
					</div>
					<hr />
					<div
						className="
  footer
  flex
  flex-col
  lg:flex-row
  py-8
  px-4
  sm:px-10
  lg:px-20
  gap-8
"
					>
						{/* footer div contact us , product, our company, newsletter related info */}
						<div
							className="
  part1
  w-full
  lg:w-[25%]
  lg:border-r
  border-[rgba(0,0,0,0.3)]
  pr-0
  lg:pr-6
"
						>
							<h2 className="text-[20px] font-[600] mb-4 ">Contact Us</h2>
							<p className="text-[14px] font-[400] pb-4 ">
								Classyshop - Mega Super Store <br /> 507-Union Trade Center
								France
							</p>
							<Link className="link" to="mailto:sales@ourcompany.com">
								sales@ourcompany.com
							</Link>
							<span className="text-[18px] font-[600] block w-full mt-3 text-[#ff5151] mb-3">
								(+91) 9876-555-6565
							</span>
							<div className="flex items-center gap-2">
								<PiChats className="text-[#ff5151] text-[50px]" />
								<span className="text-[18px] text-black font-[500] ">
									Online Chat <br /> Get Expert Help{" "}
								</span>
							</div>
						</div>

						<div
							className="
  part2
  w-full
  lg:w-[40%]
  grid
  grid-cols-1
  sm:grid-cols-2
  gap-8
"
						>
							<div className="part2_col1">
								<h2 className="text-[20px] font-[600] mb-4 ">Products</h2>

								<ul className="list">
									<li className="list-none text-[14px] w-full mb-2">
										<Link to="/" className="link">
											Prices Drop
										</Link>
									</li>
									<li className="list-none text-[14px] w-full mb-2">
										<Link to="/" className="link">
											New Products
										</Link>
									</li>
									<li className="list-none text-[14px] w-full mb-2">
										<Link to="/" className="link">
											Bext sales
										</Link>
									</li>
									<li className="list-none text-[14px] w-full mb-2">
										<Link to="/" className="link">
											Contact us
										</Link>
									</li>
									<li className="list-none text-[14px] w-full mb-2">
										<Link to="/" className="link">
											Sitemap
										</Link>
									</li>
									<li className="list-none">
										<Link to="/" className="link text-[14px]">
											Stores
										</Link>
									</li>
								</ul>
							</div>

							<div className="part2_col2">
								<h2 className="text-[20px] font-[600] mb-4 ">Our Company</h2>

								<ul className="list">
									<li className="list-none text-[14px] w-full mb-2">
										<Link to="/" className="link">
											Delivery
										</Link>
									</li>
									<li className="list-none text-[14px] w-full mb-2">
										<Link to="/" className="link">
											Legal Notice
										</Link>
									</li>
									<li className="list-none text-[14px] w-full mb-2">
										<Link to="/" className="link">
											Term And Conditions Of Use
										</Link>
									</li>
									<li className="list-none text-[14px] w-full mb-2">
										<Link to="/" className="link">
											About Us
										</Link>
									</li>
									<li className="list-none text-[14px] w-full mb-2">
										<Link to="/" className="link">
											Secure Payment
										</Link>
									</li>
									<li className="list-none">
										<Link to="/" className="link text-[14px]">
											Login
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div
							className="
  part3
  w-full
  lg:w-[35%]
  flex
  flex-col
"
						>
							<h2 className="text-[20px] font-[600] mb-4 ">
								Subscribe to newsletter
							</h2>
							<p className="text-[12px]">
								Subscribe to our latest newsletter to get news about special
								discounts
							</p>
							<form className="mt-5 ">
								<input
									type="text"
									className="w-full h-[45px] border outline-none pl-4 pr-4 rounded-md focus:border-[gbga(0,0,0,0.3)]"
									placeholder="Your Email Address"
								/>
								<Button className="btn-org">SUBSCRIBE</Button>

								<FormControlLabel
									control={<Checkbox />}
									label="I agree to the terms and conditions and the privacy policy"
								/>
							</form>
						</div>
					</div>
				</div>
			</footer>

			<div className="bottomStrip border-t border-[rgba(0,0,0,.2)] py-3 bg-white mb-10 md:mb-0">
				{/* this div contain social media and payment partener info */}
				<div
					className="
    container
    flex
    flex-col
    md:flex-row
    items-center
    justify-between
    gap-4
    text-center
    md:text-left
  "
				>
					<ul className="flex items-center justify-center gap-4">
						<li className="list-none">
							<Link
								to="/"
								target="_blank"
								className="link w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-[#ff5151] "
							>
								<FaFacebookF className="text-[15px] group-hover:text-white " />
							</Link>
						</li>
						<li className="list-none ">
							<Link
								to="/"
								target="_blank"
								className="link w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-[#ff5151] "
							>
								<FaXTwitter className="text-[15px] group-hover:text-white " />
							</Link>
						</li>
						<li className="list-none ">
							<Link
								to="/"
								target="_blank"
								className="link w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-[#ff5151] "
							>
								<FaInstagram className="text-[15px] group-hover:text-white " />
							</Link>
						</li>
						<li className="list-none ">
							<Link
								to="/"
								target="_blank"
								className="link w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-[#ff5151] "
							>
								<RiYoutubeLine className="text-[15px] group-hover:text-white " />
							</Link>
						</li>
						<li className="list-none ">
							<Link
								to="/"
								target="_blank"
								className="link w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-[#ff5151] "
							>
								<FaPinterestP className="text-[15px] group-hover:text-white " />
							</Link>
						</li>
					</ul>

					<p className="text-[12px] sm:text-[13px] text-center">
						© 2024 - Ecommerce Templet™
					</p>

					<div className="flex items-center justify-center gap-1 flex-wrap">
						<img
							src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734944434/paypal_bqbf5i.png"
							alt="image"
						/>
						<img
							src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734944434/carte_bleue_vei2ws.png"
							alt="image"
						/>
						<img
							src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734944435/visa_ustz4e.png"
							alt="image"
						/>
						<img
							src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734944434/master_card_pfwsjg.png"
							alt="image"
						/>
						<img
							src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734944434/american_express_fkv7cj.png"
							alt="image"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Footer;
