<template>
  <div class="reward-box">
<!--    <div class="user-info center-width">-->
<!--      <div class="avatar-img"><img src="../../assets/image/logo@2x.png" alt=""></div>-->
<!--      <div class="user-name">BONDING</div>-->
<!--      <div class="balance-list display-flex box-center-Y">-->
<!--        <div class="balance-item">-->
<!--          <div class="title">Your Transferrable <br>-->
<!--                             GlC Holdings-->
<!--          </div>-->
<!--          <div class="amount">3345</div>-->
<!--        </div>-->
<!--        <div class="balance-item">-->
<!--          <div class="title">Your Staked Seaweed</div>-->
<!--          <div class="amount">345</div>-->
<!--        </div>-->
<!--        <div class="balance-item">-->
<!--          <div class="title">Current SEAWEED Price</div>-->
<!--          <div class="amount">$3345</div>-->
<!--        </div>-->
<!--        <div class="balance-item">-->
<!--          <div class="title">Total USD Value</div>-->
<!--          <div class="amount">21312</div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="interface-box center-width display-flex box-center-start">
      <div class="sub-title-box">
        <div class="display-flex box-center-end">
          <div class="line1"></div>
          <div class="box-flex1 line2"></div>
        </div>
        <div class="text1">HELP US </div>
        <div class="text2">with the</div>
        <div class="text3">SWF price</div>
        <div class="text4">Discovery</div>
      </div>
      <div class="con-box box-flex1">
        <div>
          <div class="item-title">Elastic Price Offering: Providing SWF token liquidity</div>
          <div class="end-tab display-flex box-center-Y">
            <div class="end-item no-select" @click="changeBoundTab(i)" :class="{active: boundTab.index === i}"
                 v-for="(v, i) in boundTab.list" :key="`endTab-list-${i}`" v-html="v"></div>
          </div>
          <div class="bound-info display-flex box-center-Y">
            <div class="box-flex1">
              <div class="title">Currenty Price Per SWF</div>
              <div class="number-box display-flex box-center-end">
                <div>{{SWFPrice}}</div>
                <div class="currency-b">HT</div>
              </div>
            </div>
            <div class="box-flex1">
              <div class="title">SWF Owned</div>
              <div class="number-box display-flex box-center-end">
                <div>{{milliFormat(SWFBalance)}}</div>
                <div class="currency-b">SWF</div>
              </div>
            </div>
            <div class="box-flex1">
              <div class="title">Remaining SWF</div>
              <div class="number-box display-flex box-center-end">
                <div>{{milliFormat(SWFTotalSupply)}}</div>
                <div class="currency-b">SWF</div>
              </div>
            </div>
          </div>
<!--          <div class="title-curw">SEAWEED Bonding Curw</div>-->
          <div class="liquidity-main display-flex box-center-start">
            <div class="liquidity-text-box">
              <div id="bondChart" class="bond-chart"></div>
<!--              <div class="liquidity-text-item">-->
<!--                <div class="display-flex box-center-Y">-->
<!--                  <div class="icon-img"><img src="../../assets/image/icon_problem@2x.png" alt=""></div>-->
<!--                  <div>Problem</div>-->
<!--                </div>-->
<!--                <div class="text-desc">Writers(Liquidity providers)receive writeWBTC tokens(ERC20)that give them a share in the poots premiums that are distributed to them after the options contracts</div>-->
<!--              </div>-->
<!--              <div class="liquidity-text-item">-->
<!--                <div class="display-flex box-center-Y">-->
<!--                  <div class="icon-img"><img src="../../assets/image/icon_remind@2x.png" alt=""></div>-->
<!--                  <div>Remind</div>-->
<!--                </div>-->
<!--                <div class="text-desc">Click the"Deposit button and 1 WBTC will be sent from your Ethereum address to the liquidity pool contract After the transaction is confirmed by miners, you will</div>-->
<!--              </div>-->
            </div>
            <div class="box-flex1">
              <div class="input-item">
                <div class="display-flex box-center-Y input-item-title">
                  <div class="input-item-title-icon"><img src="../../assets/image/icon_trade_1@2x.png" alt=""></div>
                  <div class="box-flex1">You are {{boundTab.list[boundTab.index].toLowerCase()}}ing this amount of SWF</div>
                </div>
                <div class="display-flex box-center-Y currency-input">
                  <y-number-input :point="6" v-model="putAmount" :max="parseInt(SWFTotalSupply)" @input="changePutAmount"></y-number-input>
                  <div class="currency">SWF</div>
                </div>
              </div>
              <div class="input-item">
                <div class="display-flex box-center-Y input-item-title">
                  <div class="input-item-title-icon"><img src="../../assets/image/icon_trade_2@2x.png" alt=""></div>
                  <div class="box-flex1">You are sending this amount of HT</div>
                </div>
                <div class="display-flex box-center-Y currency-input">
                  <y-number-input :point="6" v-model="getAmount" :readonly="true"></y-number-input>
                  <div class="currency">HT</div>
                </div>
              </div>
              <div class="btn-liquidity-deposit no-select" v-show="boundTab.index === 0" @click="buy">BUY</div>
              <div class="btn-liquidity-deposit no-select" :class="{'no-active': !(SWFBalance > 0)}" v-show="boundTab.index === 1" @click="sell">SELL</div>
            </div>
          </div>
        </div>
        <div class="token-box" v-show="interfaceTab.list[interfaceTab.index].type === 'token'">
          <div class="display-flex box-center-Y">
            <div class="box-flex1">
              <div class="token-title">Total Staked</div>
              <div class="number-box display-flex box-center-end">
                <div>{{milliFormat(tokenAnalytics.totalStaked)}}</div>
                <div class="currency-b">SWF</div>
              </div>
            </div>
            <div class="box-flex1">
              <div class="token-title">Active Pots</div>
              <div class="number-box display-flex box-center-end">
                <div>{{tokenAnalytics.activePots}}/1500</div>
              </div>
            </div>
            <div class="box-flex1">
              <div class="token-title">Settlements Fee Rate</div>
              <div class="number-box display-flex box-center-end">
                <div>2</div>
                <div class="currency-b">%</div>
              </div>
            </div>
          </div>
<!--          <div class="display-flex box-center-Y token-2">-->
<!--            <div class="box-flex1">-->
<!--              <div class="token-title">SettlemYour Buy Priceents Fees in HT</div>-->
<!--              <div class="number-box display-flex box-center-end">-->
<!--                <div>131</div>-->
<!--                <div class="currency-b">HT</div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="box-flex1">-->
<!--              <div class="token-title">Settlements Fees in HBTC</div>-->
<!--              <div class="number-box display-flex box-center-end">-->
<!--                <div>122</div>-->
<!--                <div class="currency-b">WBTC</div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="box-flex1">-->
<!--              <div class="token-title">Settlements Fees in HETH</div>-->
<!--              <div class="number-box display-flex box-center-end">-->
<!--                <div>12</div>-->
<!--                <div class="currency-b">WETH</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
      <dialogConfirm :isShow="showLockToken" @saveDialog="lockToken" @closeDialog="showLockToken=false">
        <div class="dialog-title">Lock Token From The Pool</div>
        <div class="dialog-input">
          <div class="text">Amount for Lock Token:</div>
          <div class="input-box display-flex box-center-Y">
            <y-number-input v-model="lockTokenAmount" :placeholder="`Please input amount`" class="box-flex1" :point="6" :max="parseFloat(endTotalList[1].balance)"></y-number-input>
            <div class="currency">{{currentCurrencyEnd.currency}}</div>
          </div>
        </div>
      </dialogConfirm>
      <dialogConfirm :isShow="showUnlockToken" @saveDialog="withdraw" @closeDialog="showUnlockToken=false">
        <div class="dialog-title">Unlock Token From The Pool</div>
        <div class="dialog-input">
          <div class="text">Amount for Unlock Token:</div>
          <div class="input-box display-flex box-center-Y">
            <y-number-input v-model="unlockTokenAmount" :placeholder="`Please input amount`" class="box-flex1" :point="6" :max="parseFloat(endTotalList[2].balance)"></y-number-input>
            <div class="currency">{{currentCurrencyEnd.currency}}</div>
          </div>
        </div>
      </dialogConfirm>
      <dialogConfirm :isShow="showStakeWithdraw" @saveDialog="stakeSell" @closeDialog="showStakeWithdraw=false">
        <div class="dialog-title">Withdraw From The Pool</div>
        <div class="dialog-input">
          <div class="text">Amount for Total Stake:</div>
          <div class="input-box display-flex box-center-Y">
            <y-number-input v-model="stakeWithdrawAmount" :placeholder="`Please input amount`" class="box-flex1" :point="0" :max="parseFloat(stakeEarnList[1].balance)"></y-number-input>
            <div class="currency">{{currentStakeTab.currency}}</div>
          </div>
        </div>
      </dialogConfirm>
      <dialogConfirm :isShow="showStakeBuy" @saveDialog="stakeBuy" @closeDialog="showStakeBuy=false">
        <div class="dialog-title">Buy Pot From The Pool</div>
        <div class="dialog-input">
          <div class="text">Amount for SWF:</div>
          <div class="input-box display-flex box-center-Y">
            <y-number-input v-model="stakeBuyAmount" :placeholder="`Please input amount`" class="box-flex1" :point="0" :max="parseFloat(stakeEarnList[0].balance)"></y-number-input>
            <div class="currency">SWF</div>
          </div>
        </div>
      </dialogConfirm>
    </div>
  </div>
</template>

<script>
export { default } from './js/index'
</script>

<style scoped lang="scss">
  @import "index";
</style>
