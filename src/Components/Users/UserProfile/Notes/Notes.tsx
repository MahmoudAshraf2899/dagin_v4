import './Notes.scss'
export const Notes = () => {
    return (
        <div className='Notes'>
            <div className='grid grid-cols-2 mt-10 pr-10'>
                <div className='col-span-full pl-4'>
                    <div className='flex justify-between'>
                        <h3 className='title'>الملاحظات</h3>
                        <div className='flex items-center add-new'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M10.5049 1.02539C6.02189 1.02539 2.375 4.67228 2.375 9.15527C2.375 13.6383 6.02189 17.2852 10.5049 17.2852C14.9879 17.2852 18.6348 13.6383 18.6348 9.15527C18.6348 4.67228 14.9879 1.02539 10.5049 1.02539ZM14.0617 9.83272H11.1823V12.7121C11.1823 13.0861 10.8789 13.3895 10.5049 13.3895C10.1309 13.3895 9.82743 13.0861 9.82743 12.7121V9.83272H6.94806C6.57404 9.83272 6.27061 9.52929 6.27061 9.15527C6.27061 8.78126 6.57404 8.47782 6.94806 8.47782H9.82743V5.59845C9.82743 5.22443 10.1309 4.921 10.5049 4.921C10.8789 4.921 11.1823 5.22443 11.1823 5.59845V8.47782H14.0617C14.4357 8.47782 14.7392 8.78126 14.7392 9.15527C14.7392 9.52929 14.4357 9.83272 14.0617 9.83272Z" fill="white" />
                            </svg>
                            <span > اضافة جديد</span>
                        </div>

                    </div>
                </div>

                <div className='col-span-full mt-4 pl-4'>
                    <div className='note-container'>
                        <div className="accordion-group">
                            <div className="accordion">
                                <input type="checkbox" id="accordion-1" className="accordion-toggle" />
                                <label htmlFor="accordion-1" className="accordion-title  flex items-start pr-5">
                                    عنوان الملاحظة
                                    <br />
                                    <div className='added-at flex'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                            <path d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z" stroke="#9BA0B1" stroke-width="1.5" />
                                            <path d="M1.875 6.125H13.125" stroke="#9BA0B1" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M5 1.75L5 3.625" stroke="#9BA0B1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10 1.75V3.625" stroke="#9BA0B1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <circle cx="7.5" cy="9.875" r="0.625" fill="#9BA0B1" />
                                            <circle cx="10" cy="9.875" r="0.625" fill="#9BA0B1" />
                                            <circle cx="5" cy="9.875" r="0.625" fill="#9BA0B1" />
                                        </svg>
                                        <span>تم الاضافة في : ٢٠ يوليو ٢٠٢٣</span>
                                    </div>
                                </label>
                                <div className="accordion-content">
                                    <div className="min-h-0 grid">
                                        <span className='description'>الوصف</span>
                                        <span className='details mt-4'>تقدم Analytics مبادرات قابلة للتنفيذ وجاهزة للصناعة في كل مرة يكمل فيها النشاط التجاري حسابه بالكامل. ,phasellus vitae amet amet، mauris faucibus في الجلوس. ,Rhoncus Pellentesque adipiscing a enim، quis tortor، not etiam. ,احصل على faucibus mattis consequat dui impdiet scelerisque. ,Lorem placerat blandit ut lobortis volutpat convallis libero. ,Sed impdiet dignissim ipsum quam.</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}