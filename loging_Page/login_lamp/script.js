gsap.registerPlugin(Draggable);

const root = document.documentElement;
const body = document.body;
const loginForm = document.querySelector(".login-form");
const authForm = document.querySelector(".auth-form");
const formTitle = document.querySelector(".form-title");
const emailGroup = document.querySelector(".email-group");
const loginButton = document.querySelector(".login-btn");
const signupButton = document.querySelector(".signup-btn");

const cordBead = document.querySelector(".cord-bead");
const cordLine = document.querySelector(".cord-line");
const hitArea = document.querySelector(".cord-hit");

let isOn = false;
let isSignUp = false;

signupButton.addEventListener("click", () => {
  isSignUp = !isSignUp;
  formTitle.textContent = isSignUp ? "Create account" : "Welcome";
  emailGroup.classList.toggle("visible", isSignUp);
  loginButton.textContent = isSignUp ? "Sign Up" : "Sign In";
  signupButton.textContent = isSignUp ? "Back to sign in" : "Create an account";
  document.querySelector("#password").setAttribute(
    "autocomplete",
    isSignUp ? "new-password" : "current-password"
  );
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

const clickSound = new Audio(
  "https://assets.codepen.io/605876/click.mp3"
);

Draggable.create(hitArea, {
  type: "y",
  bounds: {
    minY: 0,
    maxY: 60,
  },

  onDrag() {
    gsap.set(cordBead, {
      y: this.y,
    });

    gsap.set(cordLine, {
      attr: {
        y2: 180 + this.y,
      },
    });
  },

  onRelease() {
    if (this.y > 30) {
      toggleLamp();
    }

    gsap.to([cordBead, hitArea], {
      y: 0,
      duration: 0.5,
      ease: "back.out(2.5)",
    });

    gsap.to(cordLine, {
      attr: {
        y2: 180,
      },
      duration: 0.5,
      ease: "back.out(2.5)",
    });
  },
});

function toggleLamp() {
  isOn = !isOn;

  clickSound.play();

  body.setAttribute("data-on", isOn);
  root.style.setProperty("--on", isOn ? 1 : 0);

  if (isOn) {
    loginForm.classList.add("active");

    gsap.to(body, {
      backgroundColor: "#1c1f24",
      duration: 0.6,
    });
  } else {
    loginForm.classList.remove("active");

    gsap.to(body, {
      backgroundColor: "#121417",
      duration: 0.6,
    });
  }
}

