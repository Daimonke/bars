let URL = ''
if(process.env.NODE_ENV === 'production'){
    URL = 'https://bars-daimonke.vercel.app'
}
if(process.env.NODE_ENV === 'development'){
    URL = 'http://localhost:3000'
}
export default URL