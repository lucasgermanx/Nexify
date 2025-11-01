import { Helmet } from "react-helmet";
import useStore from "../hooks/store.hook";

export const HelmetSEO = ({ children }:any) => {
    const {store} = useStore()
    return (
        <>
            <Helmet>
                <title>{store?.contents?.[0].title ? store?.contents?.[0].title : "FiveMarket - Template"}</title>
                <link rel="icon" type="image/x-icon" href={'data:image/png;base64,'+store?.contents?.[0].favicon}></link>
                <meta
                    name="description"
                    content={store?.contents?.[0].description}
                />
                <meta
                    name="keywords"
                    content="Music, Audio, Lyrics"
                />
            </Helmet>
            {children}
        </>
    )
}