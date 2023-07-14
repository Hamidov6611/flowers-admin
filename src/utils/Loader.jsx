import React from 'react'
import './loader.css'

const Loader = () => {
  return (
    <div style={{width:"100%", height:"100vh",position:'fixed', top:0, left:0, display:"flex"}}>
        <div className="container">
  <div className="top">
    <div className="square">
      <div className="square">
        <div className="square">
          <div className="square">
            <div className="square"><div className="square">
            </div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bottom">
    <div className="square">
      <div className="square">
        <div className="square">
          <div className="square">
            <div className="square"><div className="square">
            </div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="left">
    <div className="square">
      <div className="square">
        <div className="square">
          <div className="square">
            <div className="square"><div className="square">
            </div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="right">
    <div className="square">
      <div className="square">
        <div className="square">
          <div className="square">
            <div className="square"><div className="square">
            </div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Loader