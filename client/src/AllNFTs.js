import React from 'react';
import axios from 'axios';
import {getPrice, getWeb3,getContracts} from "./utils.js";
import { Link } from 'react-router-dom';
import './styles/cards.css'
import './styles/grid.css'
import './styles/nav.css'
import './styles/global.css'
import Thumbnail from './Thumbnail.js'
import { withRouter } from 'react-router-dom'

class AllNFTs extends React.Component {
	constructor(props) {
		super(props)
}
	state = {
		nfts: [],
		web3: undefined,
		accounts:[],
		contracts: undefined,
		price: 0,
		numItems:[],
		itemStructs: []
	}

	componentWillMount() {
		const init = async () => {
			let web3 = await getWeb3();
			let contracts = await getContracts(web3);
			let accounts = await web3.eth.getAccounts();
			let price = await getPrice();
			const notAp1 = "https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/1ed941b7d96b0674040bbe830f9b1d78275196e8_254x191.jpg?w=255"
			const notAp6 = "https://i0.wp.com/nursingclio.org/wp-content/uploads/2014/10/eniac_scientists_holding_various_parts_of_the_computer.jpg?ssl=1"
			const auctionPrice = 30;
			console.log(contracts);
			let currTokenId;
			let listingPrice = await contracts.stripeMarket.methods.getListingPrice().call({from: accounts[0]});
			listingPrice = listingPrice.toString()
			/*let priceT ;
			let priceOne =await price.priceFeed.methods.latestRoundData().call()
					.then((roundData) => {
							// Do something with roundData
							let nPrice = Number(roundData.answer)/100000000
							priceT= nPrice;
					});*/
			const photoUrl = "https://icdn.digitaltrends.com/image/digitaltrends/eniac-women-programmers-feat.jpg"
			const photoname = "The Women of Eniac"
			//await contracts.nft.methods.createToken(photoUrl).send({from:accounts[0]})
			//.then (data => {
			//	currTokenId = data.events.Transfer.returnValues.tokenId
			//})
			//await contracts.stripeMarket.methods.createItem(contracts.nft._address, currTokenId, auctionPrice, photoname).send({from:accounts[0], value: listingPrice })
			//await contracts.stripeMarket.methods.createMarketSale (contracts.nft._address,"0x7f0150B38f6B478c8Bab14d269Fc78E06aEEFb05",1).send ({from:accounts[0], value: auctionPrice})
			//.then (data => {
			//	console.log(data);
			//})

			let numTokens = await contracts.stripeMarket.methods.getItemId().call({from:accounts[0]});
			await contracts.stripeMarket.methods.fetchItemsCreated().call({from: accounts[0]})
			.then(data=>console.log(data))
			let numItems=[]
			let stars =[];

			for (let i =0; i<numTokens; i++){
				const mItem = await contracts.stripeMarket.methods.idToMarketItem(i+1).call({from: accounts[0]});
				let cup = await mItem.tokenUri;
				if (cup !== notAp1 && cup !==  notAp6){
					/*let pr = (Number(mItem.price)*priceT)+2;
					mItem.price = pr.toFixed(2).toString()*/
					stars.push(mItem);
					const tId = await mItem.tokenId
					const po = await contracts.nft.methods.tokenURI(tId).call({from: accounts[0]});
					numItems.push(po)
			}
			}

			await this.setState({
				web3: web3,
				contracts: contracts,
				accounts: accounts,
				numItems: numItems,
				itemStructs: stars,
				price: price
			})
		}
		init();
	}


	render() {
		return (
			<>
			<div  className="tryguy">
			<nav>
				<Link to="/" className="logo"> </Link>
				<div className="profile">
				<a href="/mint" className="button">
					<span>Mint NFT</span>
				</a>

					<a href="/account" className="button">
						<span>View Owned NFTs</span>
					</a>
				</div>
			</nav>
					<div className="grid four large">
						{// List of thumbnails
						this.state.numItems.map((item,index) => (
							<Thumbnail image_id = {item} image_name= {this.state.itemStructs[index].name} image_price= {this.state.itemStructs[index].price} image_itemId ={this.state.itemStructs[index].itemId} image_status= {this.state.itemStructs[index].sold}/>
						))}
					</div>
					</div>
			</>
		)

	}

}

export default withRouter(AllNFTs)
