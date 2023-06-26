const roles = {
	admin: "images/admin.svg",
	student: "images/student.svg",
	lector: "images/lector.svg"
};

const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "images/man.svg",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "images/girl.svg",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "images/man.svg",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "images/girl.svg",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "images/girl.svg",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "images/man.svg",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
]

class User {
	constructor(name, age, image, role, courses) {
		this.name = name;
		this.age = age;
		this.image = image;
		this.role = role;
		this.courses = courses || [];
	}
	render() {
		document.write(
			`<div class="user">
				<div class="user__info">
					<div class="user__info--data">
							<img src="${this.image}" alt="${this.name}" height="50">
							<div class="user__naming">
									<p>Name: <b>${this.name}</b></p>
									<p>Age: <b>${this.age}</b></p>
							</div>
					</div>
					<div class="user__info--role ${this.role}">
							<img src="${roles[this.role]}" alt="${this.role.toLowerCase()}" height="25">
							<p>${this.role}</p>
					</div>
				</div>
				${this.renderCourses()}
			</div>`
		)
	}
	renderCourses() {
		const courses = this.courses.map(cours => `
		<p class="user__courses--course student">
		${cours.title} <span class="${this.getGrade(cours.mark)}">
			${this.capitaliseTheFirstLetterOfEachWord(this.getGrade(cours.mark))}
		</span>
		</p>`
		)
		return `<div class="user__courses">${courses.join('')}</div>`
	}
	getGrade(mark) {
		return gradation[Math.min(...Object.keys(gradation)
			.filter(range => mark <= range ? range : null))];
	}
	capitaliseTheFirstLetterOfEachWord(string) {
		const stringWithoutDash = string.replaceAll('-', ' ');
		return stringWithoutDash.split(' ').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' ');
	}
}

class Student extends User {
	constructor(name, age, image, role, courses) {
		super(name, age, image, role, courses);
	}
}

class Admin extends User {
	constructor(name, age, image, role, courses) {
		super(name, age, image, role, courses);
	}
	renderCourses() {
		const courses = this.courses.map(cours => `
		<div class="user__courses--course admin">
			<p>Title: <b>${cours.title}</b></p>
			<p>Admin's score: <span class="${this.getGrade(cours.score)}">
				${this.capitaliseTheFirstLetterOfEachWord(this.getGrade(cours.score))}
			</span></p>
			<p>Lector: <b>${cours.lector}</b></p>
		</div>`)
		return `<div class="user__courses admin--info">${courses.join('')}</div>`
	}
}

class Lector extends User {
	constructor(name, age, image, role, courses) {
		super(name, age, image, role, courses);
	}
	renderCourses() {
		const courses = this.courses.map(cours => `
		<div class="user__courses--course lector">
			<p>Title: <b>${cours.title}</b></p>
			<p>Lector's score: <span class="${this.getGrade(cours.score)}">
				${this.capitaliseTheFirstLetterOfEachWord(this.getGrade(cours.score))}
			</span></p>
			<p>Average student's score: <span class="${this.getGrade(cours.studentsScore)}">
				${this.capitaliseTheFirstLetterOfEachWord(this.getGrade(cours.studentsScore))}
			</span></p>
		</div>`)
		return `<div class="user__courses admin--info">${courses.join('')}</div>`
	}
}

const newUsers = users
	.map(user => {
		if (user.role === 'student') {
			return new Student(user.name, user.age, user.img, user.role, user.courses);
		} else if (user.role === 'admin') {
			return new Admin(user.name, user.age, user.img, user.role, user.courses);
		} else if (user.role === 'lector') {
			return new Lector(user.name, user.age, user.img, user.role, user.courses);
		}
	});

newUsers.forEach(user => user.render());
