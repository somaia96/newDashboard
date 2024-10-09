
const HomeSkeleton = () => {
    return (
        <div>
            {Array.from({ length: 4 }).map((_, i) => {
                return (
                    <div key={i}>
                        <div className="flex justify-between mt-10 mb-5">
                            <div className="h-2.5 bg-gray-400 rounded-full w-32 mb-4"></div>
                            <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-4"></div>
                        </div>
                        <div className="space-y-5">
                            
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default HomeSkeleton
