import './App.css'
const Category = () => {
    return (
        <>
            <div className="container category my-5">
                <div className='row gap-2 justify-content-center'>
                    <div className='col-md-5 col-category'>
                        <img src="images/img_1.jpg" alt='category' className='img-fluid' />
                        <div className='col-content'>
                            <h4 className='text-white fw-bold'>Accessories</h4>
                        </div>
                    </div>
                    <div className='col-md-5 col-category'>
                    <img src="images/img_2.jpg" alt='category' className='img-fluid' />
                    <div className='col-content'>
                        <h4 className='fw-bold text-white'>Clothings</h4>
                    </div>
                    </div>
                </div>
                
            </div>
        </>
        )
}

export default Category