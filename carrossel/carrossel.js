var elements = document.getElementsByClassName("carrossel");
for (var i = 0; i < elements.length; i++) {
  ReactDOM.render(
    <div className="conteudo-fluid">
    <div className="row">
      <div className="header">
        <h3 className="title px-5">Título aqui!</h3>
        <div className="indicadores"></div>
      </div>
      <div className="conteudo">
        <button className="handle left-handle">
          <div className="text">&#8249;</div>
        </button>
        <div className="slider">
          <img src="img/serie1.jpg" alt="Série 1" />
          <img src="img/serie2.jpg" alt="Série 2" />
          <img src="img/serie1.jpg" alt="Série 3" />
          <img src="img/serie2.jpg" alt="Série 4" />
          <img src="img/serie1.jpg" alt="Série 5" />
          <img src="img/serie2.jpg" alt="Série 6" />
          <img src="img/serie1.jpg" alt="Série 7" />
          <img src="img/serie2.jpg" alt="Série 8" />
          <img src="img/serie1.jpg" alt="Série 9" />
          <img src="img/serie2.jpg" alt="Série 10"/>
          <img src="img/serie1.jpg" alt="Série 5" />
          <img src="img/serie2.jpg" alt="Série 6" />
          <img src="img/serie1.jpg" alt="Série 5" />
          <img src="img/serie2.jpg" alt="Série 6" />
          <img src="img/serie1.jpg" alt="Série 5" />
          <img src="img/serie2.jpg" alt="Série 6" />
          <img src="img/serie1.jpg" alt="Série 5" />
          <img src="img/serie2.jpg" alt="Série 6" />
          <img src="img/serie1.jpg" alt="Série 5" />
          <img src="img/serie2.jpg" alt="Série 6" />
        </div>
        <button className="handle right-handle">
          <div className="text">&#8250;</div>
        </button>
      </div>
    </div>
  </div>, 
  elements[i]);
}
    document.addEventListener("click", e => {
      let handle
      if (e.target.matches(".handle")) {
        handle = e.target
      } else {
        handle = e.target.closest(".handle")
      }
      if (handle != null) onHandleClick(handle)
    })
    
    const throttleProgressBar = throttle(() => {
      document.querySelectorAll(".indicadores").forEach(calculateProgressBar)
    }, 250)
    window.addEventListener("resize", throttleProgressBar)
    
    document.querySelectorAll(".indicadores").forEach(calculateProgressBar)
    
    function calculateProgressBar(progressBar) {
      progressBar.innerHTML = ""
      const slider = progressBar.closest(".row").querySelector(".slider")
      const itemCount = slider.children.length
      const itemsPerScreen = parseInt(
        getComputedStyle(slider).getPropertyValue("--items-per-screen")
      )
      let sliderIndex = parseInt(
        getComputedStyle(slider).getPropertyValue("--slider-index")
      )
      const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)
    
      if (sliderIndex >= progressBarItemCount) {
        slider.style.setProperty("--slider-index", progressBarItemCount - 1)
        sliderIndex = progressBarItemCount - 1
      }
    
      for (let i = 0; i < progressBarItemCount; i++) {
        const barItem = document.createElement("div")
        barItem.classList.add("progress-item")
        if (i === sliderIndex) {
          barItem.classList.add("active")
        }
        progressBar.append(barItem)
      }
    }
    
    function onHandleClick(handle) {
      const progressBar = handle.closest(".row").querySelector(".indicadores")
      const slider = handle.closest(".conteudo").querySelector(".slider")
      const sliderIndex = parseInt(
        getComputedStyle(slider).getPropertyValue("--slider-index")
      )
      const progressBarItemCount = progressBar.children.length
      if (handle.classList.contains("left-handle")) {
        if (sliderIndex - 1 < 0) {
          slider.style.setProperty("--slider-index", progressBarItemCount - 1)
          progressBar.children[sliderIndex].classList.remove("active")
          progressBar.children[progressBarItemCount - 1].classList.add("active")
        } else {
          slider.style.setProperty("--slider-index", sliderIndex - 1)
          progressBar.children[sliderIndex].classList.remove("active")
          progressBar.children[sliderIndex - 1].classList.add("active")
        }
      }
    
      if (handle.classList.contains("right-handle")) {
        if (sliderIndex + 1 >= progressBarItemCount) {
          slider.style.setProperty("--slider-index", 0)
          progressBar.children[sliderIndex].classList.remove("active")
          progressBar.children[0].classList.add("active")
        } else {
          slider.style.setProperty("--slider-index", sliderIndex + 1)
          progressBar.children[sliderIndex].classList.remove("active")
          progressBar.children[sliderIndex + 1].classList.add("active")
        }
      }
    }
    
    function throttle(cb, delay = 1000) {
      let shouldWait = false
      let waitingArgs
      const timeoutFunc = () => {
        if (waitingArgs == null) {
          shouldWait = false
        } else {
          cb(...waitingArgs)
          waitingArgs = null
          setTimeout(timeoutFunc, delay)
        }
      }
    
      return (...args) => {
        if (shouldWait) {
          waitingArgs = args
          return
        }
    
        cb(...args)
        shouldWait = true
        setTimeout(timeoutFunc, delay)
      }
    }