import * as echarts from 'echarts'
import { useTokenContract, useTokenContractWeb3 } from '../../../utils/web3/web3Utils'
import COIN_ABI from '../../../utils/web3/coinABI'
import { sendTransactionEvent, useContractMethods } from '../../../utils/web3/contractEvent'
import { keepPoint, numDiv } from '../../../utils/function'
import { approveEvent } from '../../../utils/web3/contractApprove'
let that
export default {
  data () {
    return {
      tokenContract: null,
      account: '',
      interfaceTab: {
        list: [{
          name: 'LIQUIDITY<br>ENDING REWARDS',
          type: 'ending'
        }, {
          name: 'LIQUIDITY<br>UTILIZATION REWARDS',
          type: 'utilization'
        }, {
          name: 'STAKING EARN<br>WBTC OR HETH OR HT',
          type: 'stakeEarn'
        }, {
          name: 'BONDING CURVE<br>BUY OR SELL SEAWEED',
          type: 'bonding'
        }, {
          name: 'SEAWEED TOKEN<br>ANALYTICS',
          type: 'token'
        }],
        index: 0
      },
      endTab: {
        list: [
          {
            currency: 'WBTC',
            contract: process.env.stake_reward_HBTC,
            contractPool: process.env.pool_HT
          },
          {
            currency: 'ETH',
            contract: process.env.stake_reward_ETH,
            contractPool: process.env.pool_HT
          },
          {
            currency: 'HT',
            contract: process.env.stake_reward_HT,
            contractPool: process.env.pool_HT
          }
        ],
        index: 0
      },
      totalProvided: 0,
      lockTokenAmount: '',
      showLockToken: false,
      showUnlockToken: false,
      unlockTokenAmount: '',
      initContractEnd: null,
      currentCurrencyEnd: {},
      endTotalList: [
        {
          icon_url: require('../../../assets/image/icon_reward_end_1@2x.png'),
          balance: 0,
          type: 'claim',
          currency: 'rSEAWEED',
          btn_text: 'CLAIM REWARDS',
          title: 'ETH POOL LIQUIDITY MINING REWARDS',
          sub_title: 'Click the Claim Rewards button and confirm the transaction forreceiving ta be able to withdraw'
        },
        {
          icon_url: require('../../../assets/image/icon_reward_end_2@2x.png'),
          balance: 0,
          type: 'lock',
          currency: 'ETH',
          btn_text: 'LOCK TOKENS',
          title: 'Your Address Balance',
          sub_title: 'Lock writeETH to start receiving. You will need to manually claim SEAWEED'
        },
        {
          icon_url: require('../../../assets/image/icon_reward_end_3@2x.png'),
          balance: 0,
          type: 'unlock',
          currency: 'ETH',
          btn_text: 'UNLOCK TOKENS',
          title: 'Locked',
          sub_title: 'Unlock writeETH ta be able to withdraw awards in rSEAWEED tokens your ETH from the liquidity pool'
        }
      ],
      stakeTab: {
        list: [
          {
            currency: 'HBTC',
            contract: process.env.stake_reward_HBTC,
            contractPool: process.env.stake_HBTC
          },
          {
            currency: 'ETH',
            contract: process.env.stake_reward_ETH,
            contractPool: process.env.stake_HETH
          },
          {
            currency: 'HT',
            contract: process.env.stake_reward_HT,
            contractPool: process.env.stake_HT
          }
        ],
        index: 0
      },
      showStakeWithdraw: false,
      stakeWithdrawAmount: '',
      showStakeBuy: false,
      stakeBuyAmount: '',
      currentStakeTab: {},
      initContractStake: null,
      potTotalSupply: 0,
      SWFTotalSupply: 0,
      SWFPrice: 0,
      stakeEarnList: [
        {
          icon_url: require('../../../assets/image/icon_reward_stake_1@2x.png'),
          balance: 0,
          type: 'withdraw',
          currency: 'SWF',
          btn_text: 'WITHDRAW',
          title: 'Total Staked',
          sub_title: 'Click the Claim Rewards button and confirm the transaction foreceiving ta be able to withdraw'
        },
        {
          icon_url: require('../../../assets/image/icon_reward_stake_2@2x.png'),
          balance: 0,
          type: 'stake',
          currency: 'ETH',
          btn_text: 'STAKE SEAWEED',
          title: 'Your Pots',
          sub_title: 'Lock writeETH to start receiving. You will need to manually claim SEAWEED'
        },
        {
          icon_url: require('../../../assets/image/icon_reward_stake_3@2x.png'),
          balance: 0,
          type: 'claim',
          currency: 'ETH',
          btn_text: 'CLAIM REWARD',
          title: 'Rewards',
          sub_title: 'Unlock writeETH ta be able to withdraw awards in rSEAWEED tokens your ETH from the liquidity pool'
        }
      ],
      utilizationTab: {
        list: [
          {
            currency: 'ALL'
          },
          {
            currency: 'WBTC'
          },
          {
            currency: 'ETH'
          }
        ],
        index: 0
      },
      utilizationData: [
        {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        },
        {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        },
        {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }, {
          id: 'type',
          type: 1231,
          amount: 2819,
          fee: 212,
          reward: 12,
          claim: 123
        }
      ],
      putAmount: '',
      getAmount: '',
      getAmountOriginal: '',
      boundTab: {
        list: ['BUY', 'SELL'],
        index: 0
      },
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          xAxis: {
            show: false,
            axisTick: {
              show: false
            },
            splitArea: {
              show: true,
              interval: 7,
              areaStyle: {
                color: ['rgba(156, 185, 24, 1)', 'rgba(235,97,95,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(235,97,95,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)']
              }
            },
            // 网格样式
            splitLine: {
              show: true,
              lineStyle: {
                color: ['blue'],
                width: 1,
                type: 'solid'
              }
            }
          }
        },
        visualMap: {
          type: 'piecewise',
          show: true,
          dimension: 0,
          pieces: [
            {
              gt: 0,
              lte: 2,
              color: 'red'
            },
            {
              gt: 2,
              lte: 7,
              color: 'rgba(156, 185, 24, 1)'
            }
          ]
        },
        yAxis: {
          type: 'value',
          // 网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ['blue'],
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {},
          smooth: true
        }]
      },
      myChart: null
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      that = this
      that.account = that.$account
      // 页面进来请求第一页的数据
      that.getEndInfo()
    },
    initChart () {
      if (that.myChart) {
        that.myChart.clear()
        this.$nextTick(function () {
          setTimeout(function () {
            that.option && that.myChart.setOption(that.option)
          }, 500)
        })
      } else {
        this.$nextTick(function () {
          setTimeout(function () {
            const chartDom = document.getElementById('bondChart')
            that.myChart = echarts.init(chartDom)
            that.option && that.myChart.setOption(that.option)
          }, 500)
        })
      }
    },
    // 钱包地址获取到之后加载页面数据
    setAccount () {
      this.initPage()
    },
    // stake start
    changeStakeTab (i) {
      that.stakeTab.index = i
      that.currentStakeTab = that.stakeTab.list[that.stakeTab.index]
      that.getStakeInfo()
    },
    // 获取第三个模块的数据
    async getStakeInfo () {
      that.currentStakeTab = that.stakeTab.list[that.stakeTab.index]
      that.stakeEarnList[1].currency = that.currentStakeTab.currency
      that.stakeEarnList[2].currency = that.currentStakeTab.currency
      that.stakeEarnList[1].sub_title = `Lock write${that.currentStakeTab.currency} to start receiving. You will need to manually claim SEAWEED`
      that.stakeEarnList[2].sub_title = `Unlock write${that.currentStakeTab.currency} ta be able to withdraw awards in rSEAWEED tokens your ${that.currentStakeTab.currency} from the liquidity pool`
      // 初始化合约
      that.initContractStake = useTokenContract(that.currentStakeTab.contractPool, COIN_ABI.stake)
      const seaweedAddress = await that.initContractStake.Seaweed()
      const seaweedContract = useTokenContract(seaweedAddress, COIN_ABI.stake_seaweed)
      const withdrawBalance = await seaweedContract.balanceOf(that.account)
      that.stakeEarnList[0].balance = parseFloat(keepPoint(that.$web3_http.utils.fromWei(withdrawBalance.toString()), 6))
      const balance = await that.initContractStake.balanceOf(that.account)
      // 获取合约read数据
      that.potTotalSupply = await that.initContractStake.totalSupply()
      that.stakeEarnList[1].balance = balance
      const profitOf = await that.initContractStake.profitOf(that.account)
      that.stakeEarnList[2].balance = parseFloat(keepPoint(that.$web3_http.utils.fromWei(profitOf.toString()), 6))
    },
    // 第三模块sell操作
    async stakeSell () {
      if (!that.stakeWithdrawAmount) {
        return alert('amount 不能为空')
      }
      const seaweedAddress = await that.initContractStake.Seaweed()
      // 获取已经approve的数量
      const allowance = await that.initContractStake.allowance(that.account, that.currentStakeTab.contractPool)
      const allowanceFormat = allowance.toString()
      console.log(allowanceFormat)
      // 判断approve的数量和当前数量
      if (parseInt(allowanceFormat) >= parseInt(that.$web3_http.utils.toWei(parseFloat(that.stakeWithdrawAmount).toString()))) {
        await that.stakeSureSell()
      } else {
        await approveEvent(that.currentStakeTab.contractPool, {
          approve_amount: that.stakeWithdrawAmount,
          symbol: 'SWF',
          address: seaweedAddress,
          wei: 'ether'
        }, that.initContractStake, function () {
          that.stakeSureSell()
        })
      }
    },
    // 执行合约的sell操作
    async stakeSureSell () {
      await useContractMethods({
        contract: that.initContractStake,
        methodName: 'sell',
        parameters: [
          that.$web3_http.utils.toWei(that.stakeWithdrawAmount.toString())
        ]
      }, function () { // 合约成功之后的回调函数
        that.showStakeWithdraw = false
        that.getStakeInfo()
        console.log('stake claimProfit success...')
      })
    },
    // 执行合约的buy操作
    async stakeBuy () {
      if (!that.stakeBuyAmount) {
        return alert('amount 不能为空')
      }
      await useContractMethods({
        contract: that.initContractStake,
        methodName: 'buy',
        parameters: [
          that.stakeBuyAmount
        ]
      }, function () {
        that.showStakeBuy = false
        that.getStakeInfo()
        console.log('stake claimProfit success...')
      })
    },
    // 执行合约的claimProfit操作
    async claimProfit () {
      await useContractMethods({
        contract: that.initContractStake,
        methodName: 'claimProfit',
        parameters: []
      }, function () {
        that.showUnlockToken = false
        that.getEndInfo()
        console.log('stake claimProfit success...')
      })
    },
    // stake end
    // 第一个模块 LIQUIDITY ENDING REWARDS start
    changeEndTab (i) {
      that.endTab.index = i
      that.currentCurrencyEnd = that.endTab.list[that.endTab.index]
      that.getEndInfo()
    },
    async getEndInfo () {
      that.currentCurrencyEnd = that.endTab.list[that.endTab.index]
      console.log(that.currentCurrencyEnd.currency)
      that.endTotalList[1].currency = that.currentCurrencyEnd.currency
      that.endTotalList[2].currency = that.currentCurrencyEnd.currency
      that.endTotalList[1].sub_title = `Lock write${that.currentCurrencyEnd.currency} to start receiving. You will need to manually claim SEAWEED`
      that.endTotalList[2].sub_title = `Unlock write${that.currentCurrencyEnd.currency} to be able to withdraw awards in rSEAWEED tokens your ${that.currentCurrencyEnd.currency} from the liquidity pool`
      // 初始化合约
      that.initContractEnd = useTokenContract(that.currentCurrencyEnd.contract, COIN_ABI.stake_reward_ETH)
      const contractPool = useTokenContract(that.currentCurrencyEnd.contractPool, COIN_ABI.pool_HT)
      // Total Provide
      const totalProvided = await that.initContractEnd.totalSupply()
      that.totalProvided = parseFloat(keepPoint(that.$web3_http.utils.fromWei(totalProvided.toString()), 2))
      if (!that.account) {
        return
      }
      // Pool Liquidity mining rewards
      const rewardsToken = await that.initContractEnd.rewardsToken()
      const rewardsTokenContract = useTokenContract(rewardsToken, COIN_ABI.r_seaweed)
      const rewardBalance = await rewardsTokenContract.balanceOf(that.account)
      that.endTotalList[0].balance = parseFloat(keepPoint(that.$web3_http.utils.fromWei(rewardBalance.toString()), 2))
      // Your Address Balance
      const balanceAddress = await contractPool.balanceOf(that.account)
      that.endTotalList[1].balance = parseFloat(keepPoint(that.$web3_http.utils.fromWei(balanceAddress.toString()), 2))
      // locked
      const balance = await that.initContractEnd.balanceOf(that.account)
      that.endTotalList[2].balance = parseFloat(keepPoint(that.$web3_http.utils.fromWei(balance.toString()), 2))
    },
    async getReward () {
      console.log('getReward。。。')
      await useContractMethods({
        contract: that.initContractEnd,
        methodName: 'getReward',
        parameters: []
      }, function () {
        console.log('getReward success...')
      })
    },
    async lockToken () {
      if (!that.lockTokenAmount) {
        return alert('amount 不能为空')
      }
      const contractPool = useTokenContract(that.currentCurrencyEnd.contractPool, COIN_ABI.pool_HT)
      const allowance = await contractPool.allowance(that.account, that.currentCurrencyEnd.contractPool)
      const allowanceFormat = allowance.toString()
      if (parseInt(allowanceFormat) >= parseInt(that.$web3.utils.toWei(parseFloat(that.lockTokenAmount).toString()))) {
        await that.lockTokenStake()
      } else {
        approveEvent(that.currentCurrencyEnd.contract, {
          approve_amount: that.lockTokenAmount,
          symbol: that.currentCurrencyEnd.currency,
          address: that.currentCurrencyEnd.contract,
          wei: 'ether'
        }, contractPool, function () {
          that.lockTokenStake()
        })
      }
    },
    async lockTokenStake () {
      await useContractMethods({
        contract: that.initContractEnd,
        methodName: 'stake',
        parameters: [
          that.$web3_http.utils.toWei(parseFloat(that.lockTokenAmount).toString())
        ]
      }, function () {
        that.showLockToken = false
        that.getEndInfo()
        console.log('stake success...')
      })
    },
    async withdraw () {
      if (!that.unlockTokenAmount) {
        return alert('amount 不能为空')
      }
      await useContractMethods({
        contract: that.initContractEnd,
        methodName: 'withdraw',
        parameters: [
          that.$web3_http.utils.toWei(parseFloat(that.unlockTokenAmount).toString())
        ]
      }, function () {
        that.showUnlockToken = false
        that.getEndInfo()
        console.log('withdraw success...')
      })
    },
    // 第一个模块 LIQUIDITY ENDING REWARDS end
    // 切换页面五个模块的初始化数据请求
    changeInterfaceTab (v, i) {
      this.interfaceTab.index = i
      switch (v.type) {
        case 'ending':
          that.getEndInfo()
          break
        case 'utilization':
          break
        case 'stakeEarn':
          that.getStakeInfo()
          break
        case 'bonding':
          that.getBondInfo()
          that.getSWFPrice()
          that.getBondChart()
          break
        case 'token':
          break
      }
    },
    changeUtilizationTab (i) {
      this.utilizationTab.index = i
    },
    // 第四个模块 bound start
    async getBondInfo () {
      const tokenContract = useTokenContract(process.env.buy_sell_HT, COIN_ABI.buy_sell)
      const token = await tokenContract.token()
      const tokenContract2 = useTokenContract(token, COIN_ABI.r_seaweed)
      const totalSupply = await tokenContract2.totalSupply()
      that.SWFTotalSupply = that.$web3_http.utils.fromWei(totalSupply.toString())
    },
    changeBoundTab (i) {
      this.boundTab.index = i
      that.putAmount = ''
      that.getAmountOriginal = ''
      that.getAmount = ''
      that.getSWFPrice()
      that.getBondChart()
    },
    async changePutAmount (val) {
      if (!parseInt(val)) {
        that.getAmountOriginal = ''
        that.getAmount = ''
        that.getSWFPrice()
        that.getBondChart()
        return
      }
      const tokenContract = useTokenContractWeb3(COIN_ABI.buy_sell, process.env.buy_sell_HT)
      let checkAmount = 0
      if (that.boundTab.index === 0) {
        checkAmount = await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei(parseFloat(val).toString())).call()
      } else {
        checkAmount = await tokenContract.methods.checkSell(that.$web3_http.utils.toWei(parseFloat(val).toString())).call()
      }
      that.getAmountOriginal = checkAmount
      that.getAmount = parseFloat(keepPoint(that.$web3_http.utils.fromWei(checkAmount), 6))
      that.SWFPrice = parseFloat(keepPoint(numDiv(that.getAmount, val), 6))
      that.getBondChart()
      console.log(that.getAmount)
    },
    getFromWeiData (num) {
      return parseFloat(keepPoint(that.$web3_http.utils.fromWei(num.toString()), 6))
    },
    async getSWFPrice () {
      let checkAmount
      const tokenContract = useTokenContractWeb3(COIN_ABI.buy_sell, process.env.buy_sell_HT)
      if (that.boundTab.index === 0) {
        checkAmount = await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('1')).call()
      } else {
        checkAmount = await tokenContract.methods.checkSell(that.$web3_http.utils.toWei('1')).call()
      }
      that.SWFPrice = parseFloat(keepPoint(that.$web3_http.utils.fromWei(checkAmount), 6))
    },
    async getBondChart () {
      const tokenContract = useTokenContractWeb3(COIN_ABI.buy_sell, process.env.buy_sell_HT)
      const seriesData = [
        await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('1')).call(),
        await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('1000000')).call(),
        await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('2000000')).call(),
        await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('3000000')).call(),
        await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('4000000')).call(),
        await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('5000000')).call(),
        await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('6000000')).call(),
        await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('7000000')).call(),
        await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('8000000')).call(),
        await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('9000000')).call(),
        await tokenContract.methods.checkBuy(that.$web3_http.utils.toWei('10000000')).call()
      ]
      console.log(seriesData)
      const seriesDataA = []
      seriesData.map(function (v, i) {
        console.log(i, v)
        seriesDataA.push(that.getFromWeiData(v))
      })
      console.log(seriesDataA)
      const getAmount = parseInt(that.putAmount) || 0
      console.log(getAmount, getAmount / 1000000)
      let pieces
      if (this.boundTab.index === 0) {
        pieces = [
          {
            gt: 0,
            lte: getAmount / 1000000,
            color: 'rgba(156, 185, 24, 1)'
          },
          {
            gt: getAmount / 1000000,
            lte: 11,
            color: 'rgba(156, 185, 24, 0.3)'
          }
        ]
      } else {
        pieces = [
          {
            gt: 0,
            lte: 11,
            color: 'rgba(156, 185, 24, 0.3)'
          }
        ]
      }
      console.log(pieces)
      that.option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0', '10M', '20M', '30M', '40M', '50M', '60M', '70M', '80M', '90M', '100M'],
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12 // 更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(156, 185, 24, 0.3)' // 更改坐标轴颜色
            }
          },
          // 网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(156, 185, 24, 0.3)'],
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          }
        },
        visualMap: {
          type: 'piecewise',
          show: true,
          dimension: 0,
          pieces: pieces
        },
        yAxis: {
          name: 'HT',
          type: 'value',
          // 网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(156, 185, 24, 0.3)'],
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          symbol: 'none',
          data: seriesDataA,
          type: 'line',
          areaStyle: {},
          smooth: true
        }]
      }
      that.initChart()
    },
    buy () {
      // 需要传Value的合约操作初始化合约
      const tokenContract = useTokenContractWeb3(COIN_ABI.buy_sell, process.env.buy_sell_HT)
      sendTransactionEvent(
        tokenContract.methods.buy(
          that.$web3_http.utils.toWei(parseFloat(that.putAmount).toString())
        )
          .send({
            from: that.account,
            value: that.getAmountOriginal // 合约需要传的Value
          }), {
          summary: `buy ${that.putAmount} HT` // 备注，可为空
        }, function () {
          that.putAmount = ''
          that.getAmountOriginal = ''
          that.getAmount = ''
          console.log('buy success。。。')
        })
    },
    async sell () {
      const tokenContract = useTokenContract(process.env.buy_sell_HT, COIN_ABI.buy_sell)
      const token = await tokenContract.token()
      const tokenContract2 = useTokenContract(token, COIN_ABI.r_seaweed)
      const allowance = await tokenContract2.allowance(that.account, process.env.buy_sell_HT)
      const allowanceFormat = allowance.toString()
      if (parseInt(allowanceFormat) >= parseInt(that.$web3_http.utils.toWei(parseFloat(that.putAmount).toString()))) {
        await that.sellSure()
      } else {
        approveEvent(process.env.buy_sell_HT, {
          approve_amount: that.putAmount,
          symbol: 'HT',
          address: token,
          wei: 'ether'
        }, tokenContract2, function () {
          that.sellSure()
        })
      }
    },
    async sellSure () {
      const tokenContract = useTokenContract(process.env.buy_sell_HT, COIN_ABI.buy_sell)
      await useContractMethods({
        contract: tokenContract,
        methodName: 'sell',
        parameters: [
          that.$web3_http.utils.toWei(parseFloat(that.putAmount).toString())
        ]
      }, function () {
        console.log('sell success...')
      })
    }
    // 第四个模块 bound start
  }
}
