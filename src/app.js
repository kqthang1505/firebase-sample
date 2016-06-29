(function() {
	'use strict';
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyASS07zZ9CmZRwBTcF_tHXeWOQwsfCMa2k",
		authDomain: "blazing-inferno-4109.firebaseapp.com",
		databaseURL: "https://blazing-inferno-4109.firebaseio.com",
		storageBucket: "blazing-inferno-4109.appspot.com",
	};
	firebase.initializeApp(config);

	var fb = {};
	var userList = document.getElementById('users-list');

	fb.database = firebase.database();
	fb.users = fb.database.ref('users');

	var loading = getLoading();

	userList.appendChild(loading);
	fb.users.on('child_added', function(data) {
		var val = data.val();
		var loading = userList.querySelector('.loading');

		// render data
		var tr = addNewEl(val)

		if (loading) {
			loading.remove();
		}

		userList.appendChild(tr);
	});

	var form = document.getElementById('userForm');
	form.addEventListener('submit', handleUserFormSubmit);

	function handleUserFormSubmit(e) {
		e.preventDefault();
		var form = this;

		var elements = form.elements;
		var data = {};

		Array.prototype.forEach.call(elements, function(el) {
			if (el.name) {
				data[el.name] = el.value;
			}
		});

		// get the key
		fb.users.push(data).then(function() {
			Materialize.toast('Success', 1000);
			form.reset();
			form.blur();
		});
	}

	function addNewEl(data) {
		var tr = document.createElement('tr');
		var tdName = document.createElement('td');
		var tdAge = document.createElement('td');
		var tdAction = document.createElement('td');
		var edit = document.createElement('a');

		edit.classList.add('material-icons');
		edit.innerText = 'mode_edit';

		tdAction.appendChild(edit);

		tdName.innerText = data.name;
		tr.appendChild(tdName);

		tdAge.innerText = data.age;
		tr.appendChild(tdAge);

		tr.appendChild(tdAction);

		return tr;
	}

	function getLoading() {
		var tr = document.createElement('tr');
		var td = document.createElement('td');

		td.setAttribute('colspan', 3);
		td.innerText = 'Loading...';

		tr.appendChild(td);
		tr.classList.add('loading');

		return tr;
	}
}());
