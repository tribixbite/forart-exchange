import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { celoInjected, injected } from './connectors'

export function useEagerConnect() {
  const { activate, active } = useWeb3React()
  const [ tried, setTried ] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized:boolean) => {
      if (isAuthorized) {
        activate(injected,undefined,true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })

    // celoInjected.isAuthorized().then((isAuthorized:boolean) => {
    //   if (isAuthorized) {
    //     activate(celoInjected,undefined,true).catch(() => {
    //       setTried(true)
    //     })
    //   } else {
    //     setTried(true)
    //   }
    // })

  },[])

  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React()

  useEffect((): any => {
    const { ethereum } = window as any
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log('Handling \'connect\' event')
        activate(injected)
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log('Handling \'chainChanged\' event with payload', chainId)
        activate(injected)
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('Handling \'accountsChanged\' event with payload', accounts)
        if (accounts.length > 0) {
          activate(injected)
        }
      }
      const handleNetworkChanged = (networkId: string | number) => {
        console.log('Handling \'networkChanged\' event with payload', networkId)
        activate(injected)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}

export function useChainEffect() {
  const { account } = useWeb3React()

  const SCAN_ADDRESS = {
    [44787]: 'https://alfajores-forno.celo-testnet.org'
  }

  const networkConf = {
    [44787]: {
      chainId: '0x' + parseInt('44787').toString(16),
      chainName: 'CELO Alfajores Testnet',
      nativeCurrency: {
        name:'',
        symbol:'',
        decimals:18,
      },
      rpcUrls: [
        'https://alfajores-forno.celo-testnet.org'
      ],
      blockExplorerUrls: [SCAN_ADDRESS[44787]]
    }
  }

  useEffect(():any => {
    const { ethereum } = window as any
    if (ethereum && ethereum.isMetaMask && networkConf[44787] ) {
      ethereum.request({
        method:'wallet_addEthereumChain',
        params:[
          {
            ...networkConf[44787]
          }
        ],
      })

    }
  },[account])

}

