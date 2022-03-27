const StripeMarket = artifacts.require('StripeMarket.sol');
const NFT = artifacts.require('NFT.sol');


contract (StripeMarket, (accounts)=>{
  let stripeMarket, nft;
  const [trader1, trader2] = [accounts[1], accounts[2]];
  beforeEach(async () => {
    stripeMarket = await StripeMarket.new();
    nft = await NFT.new(stripeMarket.address);
  });
  it('should list price', async()=>{
    let listingPrice = await stripeMarket.getListingPrice()
    listingPrice = listingPrice.toString()
    console.log(listingPrice);
  })
  it('should create and list token', async()=>{
    let listingPrice = await stripeMarket.getListingPrice()
    listingPrice = listingPrice.toString()
    console.log(listingPrice);
    const auctionPrice = web3.utils.toWei('1', 'ether')
    await nft.createToken("https://media.npr.org/assets/img/2021/03/05/nyancat-still-6cda3c8e01b3b5db14f6db31ce262161985fb564-s900-c85.webp");
    let po = (await nft._tokenIds.call({from:accounts[0]}));
    const exp =  await stripeMarket.createItem(nft.address, po.words[0], auctionPrice, {from: accounts[0], value: 2 })

    await nft.createToken("https://d3hnfqimznafg0.cloudfront.net/images/Article_Images/ImageForArticle_876(1).jpg");
    let p = (await nft._tokenIds.call({from:accounts[0]}));
    await stripeMarket.createItem(nft.address,p.words[0], auctionPrice, {from: accounts[0], value: 2 })
    let itemId = (exp.logs[0].args.itemId.words[0]);

    await stripeMarket.createMarketSale(nft.address, accounts[1], itemId, { from: accounts[1], value: auctionPrice})
    let items = await stripeMarket.fetchItemsCreated({from:accounts[0]})
    console.log(items);
    console.log(`iteams!!!!!`);
    let items0 = await stripeMarket.fetchMyNFTs({from: accounts[1]})
    console.log(items[0]);

  });


})
