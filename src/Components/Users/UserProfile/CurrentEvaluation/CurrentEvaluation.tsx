import './CurrentEvaluation.scss'
export const CurrentEvaluation = () => {
    return (
        <div className='CurrentEvaluation'>
            <div className='grid grid-cols-2'>
                <div className='col-span-full'>
                    <div className='flex justify-between'>
                        <h2 className='current-eval'>التقييم الحالي</h2>
                        <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M22 12V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H12M15.6864 4.02275C15.6864 4.02275 15.6864 5.45305 17.1167 6.88334C18.547 8.31364 19.9773 8.31364 19.9773 8.31364M9.15467 15.9896L12.1583 15.5605C12.5916 15.4986 12.9931 15.2978 13.3025 14.9884L21.4076 6.88334C22.1975 6.09341 22.1975 4.81268 21.4076 4.02275L19.9773 2.59245C19.1873 1.80252 17.9066 1.80252 17.1167 2.59245L9.01164 10.6975C8.70217 11.0069 8.50142 11.4084 8.43952 11.8417L8.01044 14.8453C7.91508 15.5128 8.4872 16.0849 9.15467 15.9896Z" stroke="#28303F" stroke-width="1.5" stroke-linecap="round" />
                        </svg></div>
                    </div>
                </div>
                <div className='col-start-1 mt-10'>
                    <div className='flex gap-4'>
                        <div className='flex items-center gap-2'>
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2.5L12.0279 7.20889L17.1329 7.68237L13.2811 11.0661L14.4084 16.0676L10 13.45L5.59161 16.0676L6.71886 11.0661L2.86708 7.68237L7.97214 7.20889L10 2.5Z" fill="#FFBB54" />
                            </svg></span>
                            <span className='number'>4.5</span>
                        </div>

                        <div className='eval-status'>
                            استثنائي
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}