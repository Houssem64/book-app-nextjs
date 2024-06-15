import { DiscussionEmbed } from "disqus-react"


const DisqusComments = ({ book }: any) => {
    const pageUrl = typeof window !== "undefined" ? window.location.href : ""
    const disqusShortname = "bookworm-6"
    const disqusConfig = {
        url: pageUrl,
        identifier: book.id, // Single post id
        title: book.title // Single post title
    }
    return (
        <div>
            <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
            />
        </div>
    )
}
export default DisqusComments;