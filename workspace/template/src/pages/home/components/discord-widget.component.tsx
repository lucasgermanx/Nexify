import useStore from "@/core/client/hooks/store.hook"

export const DiscordWidgetComponent = () => {
    const {store} = useStore()
    return (
        <div className="mt-4">
            <iframe src={`https://discord.com/widget?id=${store?.contents?.[0].widget_discord}&theme=dark`} style={{width:"100%"}} height="500" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </div>
    )
}