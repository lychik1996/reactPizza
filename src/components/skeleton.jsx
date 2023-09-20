import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
    <ContentLoader 
      speed={2}
      width={280}
      height={472}
      viewBox="0 0 280 472"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="10" y="0" rx="10" ry="10" width="260" height="260" /> 
      <rect x="0" y="281" rx="5" ry="5" width="280" height="24" /> 
      <rect x="0" y="317" rx="10" ry="10" width="280" height="85" /> 
      <rect x="0" y="426" rx="5" ry="5" width="89" height="27" /> 
      <rect x="121" y="419" rx="4" ry="4" width="155" height="40" />
    </ContentLoader>
  )


export default MyLoader;