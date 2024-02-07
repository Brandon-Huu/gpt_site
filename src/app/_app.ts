import { Provider } from 'next-auth/client';

export default App({Component, pageProps }){
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
