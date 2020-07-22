let user = {
	JavaScript: {
		userAnswers: []
	},
	React: {
		userAnswers: []
	},
	CSS: {
		userAnswers: []
	}
};

let decks = {
	JavaScript: [
		{
			question: 'Inside which HTML element do we put the JavaScript?',
			options: ['<script>', '<javascript>', '<js>'],
			answer: 0
		},
		{
			question: 'Where is the correct place to insert a JavaScript?',
			options: ['<head>', '<body>', 'both of above'],
			answer: 1
		},
		{
			question: 'The external JavaScript file must contain the <script> tag.',
			options: ['true', 'false'],
			answer: 0
		},
		{
			question: "How do you write 'Hello World' in an alert box?",
			options: [`alertBox('Hello World')`, `msg('Hello World')`, `alert('Hello World')`],
			answer: 2
		},
		{
			question: 'How can you add a comment in a JavaScript?',
			options: ['// This is a comment', '`This is a comment', '<!-- This is a comment -->'],
			answer: 0
		}
	],
	React: [
		{
			question: 'React is mainly used for building ___.',
			options: ['Database', 'Connectivity', 'User Interface', 'Design Platform'],
			answer: 2
		},
		{
			question: 'The lifecycle methods are mainly used for ___.',
			options: [
				'keeping track of event history',
				'enhancing components',
				' freeing up resources',
				'none of the above'
			],
			answer: 0
		},
		{
			question:
				'___ can be done while multiple elements need to be returned from a component.',
			options: ['Abstraction', 'Packing', 'Insulation', 'Wrapping'],
			answer: 0
		},
		{
			question: 'What is used to pass data to a component from outside?',
			options: ['setState', 'render with arguments', 'propTypes', 'props'],
			answer: 3
		},
		{
			question:
				'Which of the following is the correct syntax for a button click event handler foo?',
			options: [
				'<button onclick={this.foo()}>',
				'<button onclick={this.foo}>',
				'<button onClick={this.foo()}>',
				'<button onClick={this.foo}>'
			],
			answer: 3
		},
		{
			question: 'What advantages does ReactJS have?',
			options: [
				'Increases the application’s performance with Virtual DOM',
				'JSX makes a code that is easy to read and write',
				'It renders both on client and server side',
				'All of the above'
			],
			answer: 3
		},
		{
			question: 'What is state in React?',
			options: ['A persistant storage.', 'An internal data store (object) of a component.'],
			answer: 1
		}
	],
	CSS: [
		{
			question: "What property is used to change the size of an HTML element's border?",
			options: ['border-size:3px;', 'border:width:3px;', 'border-width:3px;'],
			answer: 2
		},
		{
			question: 'Which property controls the size of a text?',
			options: ['font-size', 'text-size', 'font-style'],
			answer: 0
		}
	]
};

export function _getDecksData() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...decks }), 500);
	});
}

export function _getUsersData() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...user }), 500);
	});
}

export function _saveUserAnswer({ category, userAnswers }) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			// call reducer
			user = {
				...user,
				[category]: {
					...user[category],
					userAnswers: user[category].userAnswers.concat([userAnswers])
				}
			};

			res();
		}, 500);
	});
}
