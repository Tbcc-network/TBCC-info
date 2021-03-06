import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { AutoRow, RowBetween } from '../components/Row'
import { AutoColumn } from '../components/Column'
import PairList from '../components/PairList'
import TopTokenList from '../components/TokenList'
import TxnList from '../components/TxnList'
import GlobalChart from '../components/GlobalChart'
import Search from '../components/Search'
import GlobalStats from '../components/GlobalStats'

import { useGlobalTransactions } from '../contexts/GlobalData'
import { useAllPairData } from '../contexts/PairData'
import { useMedia } from 'react-use'
import Panel from '../components/Panel'
import { useAllTokenData } from '../contexts/TokenData'
import { TYPE } from '../Theme'
import { CustomLink } from '../components/Link'

import { PageWrapper, ContentWrapper } from '../components'

const ListOptions = styled(AutoRow)`
  width: 100%;
  font-size: 1.25rem;
  font-weight: 600;

  @media screen and (max-width: 640px) {
    font-size: 1rem;
  }
`

const GridRow = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  align-items: start;
  justify-content: space-between;
`

function GlobalPage() {
  // get data for lists and totals
  const allPairs = useAllPairData()
  const allTokens = useAllTokenData()
  const transactions = useGlobalTransactions()

  // breakpoints
  const below800 = useMedia('(max-width: 800px)')

  // scrolling refs

  useEffect(() => {
    document.querySelector('body').scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }, [])

  return (
    <PageWrapper>
      <ContentWrapper>
        <div>
          <AutoColumn gap="24px" style={{ paddingBottom: below800 ? '40px' : '50px' }}>
            <TYPE.largeHeader style={{ marginBottom: '6px', fontFamily: 'Gilroy-Medium' }}>
              {below800 ? 'Protocol Analytics' : 'TBCC Protocol Analytics'}
            </TYPE.largeHeader>
            <Search />
            <GlobalStats />
          </AutoColumn>
          {!below800 && (
            <GridRow>
              <Panel style={{ height: '100%', minHeight: '323px', padding: 30 }}>
                <GlobalChart display="liquidity" />
              </Panel>
              <Panel style={{ height: '100%', padding: 30 }}>
                <GlobalChart display="volume" />
              </Panel>
            </GridRow>
          )}
          {below800 && (
            <AutoColumn gap="20px">
              <AutoColumn gap="24px">
                <Panel style={{ height: '100%', minHeight: '300px', padding: 20 }}>
                  <GlobalChart display="liquidity" />
                </Panel>
              </AutoColumn>
              <AutoColumn gap="24px">
                <Panel style={{ height: '100%', minHeight: '300px', padding: 20 }}>
                  <GlobalChart display="volume" />
                </Panel>
              </AutoColumn>
            </AutoColumn>
          )}
          <ListOptions gap="10px" style={{ margin: below800 ? '34px 0 18px' : '40px 0 18px' }}>
            <RowBetween>
              <TYPE.main style={{ fontFamily: 'Gilroy-Medium' }} fontSize="18px">
                Top Tokens
              </TYPE.main>
              <CustomLink to={'/tokens'} style={{ color: '#454545' }}>
                See all
              </CustomLink>
            </RowBetween>
          </ListOptions>
          <Panel style={{ padding: below800 ? '20px 0 0 0' : '20px 0 30px' }}>
            <TopTokenList tokens={allTokens} />
          </Panel>
          <ListOptions gap="10px" style={{ margin: below800 ? '34px 0 18px' : '40px 0 18px' }}>
            <RowBetween>
              <TYPE.main style={{ fontFamily: 'Gilroy-Medium' }} fontSize="18px">
                Top Pairs
              </TYPE.main>
              <CustomLink to={'/pairs'} style={{ color: '#454545' }}>
                See all
              </CustomLink>
            </RowBetween>
          </ListOptions>
          <Panel style={{ padding: below800 ? '20px 0 0 0' : '20px 0 30px' }}>
            <PairList pairs={allPairs} />
          </Panel>

          <span>
            <TYPE.main
              fontSize="18px"
              style={{ margin: below800 ? '34px 0 18px' : '40px 0 18px', fontFamily: 'Gilroy-Medium' }}
            >
              Transactions
            </TYPE.main>
          </span>
          <Panel style={{ padding: below800 ? '20px 0 0 0' : '20px 0 30px' }}>
            <TxnList transactions={transactions} />
          </Panel>
        </div>
      </ContentWrapper>
    </PageWrapper>
  )
}

export default withRouter(GlobalPage)
