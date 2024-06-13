import StarIcon from '@mui/icons-material/Star';
export default function BookCard({ title, author, description, coverImage, onClick, tags, rating }: any) {
    return (
        <>


            <div style={contentStyle}>
                <h3 style={titleStyle}></h3>
                <p style={descriptionStyle}></p>
            </div>



            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md" onClick={onClick}>
                <img

                    className="w-full h-[400px] object-cover"
                    height={400}
                    src={coverImage}
                    alt={title}
                    style={{
                        aspectRatio: "300/400",
                        objectFit: "cover",
                    }}
                    width={300}
                />
                <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{author} </p>
                    <div className="flex items-center gap-2 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={i < rating ? "text-yellow-500" : "text-gray-400 dark:text-gray-600"} />
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <div>{description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>{tags}</div>
                    </div>

                </div>
            </div>
        </>
    )
}


const cardStyle = {
    width: '200px',
    padding: '1rem',
    borderRadius: '5px',
    backgroundColor: '#f8eadd',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    marginBottom: '1.5rem',
    marginRight: '1.6rem',
};

const imageStyle = {
    width: '100%',
    aspectRatio: 1,
    borderRadius: '5px',
};

const contentStyle = {
    marginTop: '1rem',
};

const titleStyle = {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#000'
};

const descriptionStyle = {
    fontSize: '0.8rem',
    color: '#888',
};
