-- insert departments
INSERT INTO departments (department_name)
VALUES 
('Curatorial'),
('Education Specialist'),
('Collection Management'),
('Marketing'),
('Development'),
('Security'),
('Facilities');

-- insert roles
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Curatorial', 94000, 1),
(2, 'Education Specialist', 60000, 2),
(3, 'Collection Management', 160000, 3),
(4, 'Marketing', 97000, 4),
(5, 'Development', 100000, 5),
(6, 'Security', 38000, 6),
(7, 'Facilities', 70000, 7);

-- insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Leonardo', 'da Vinci', 1, 1),
('Vincent', 'Van Gogh', 2, 2),
('Claude', 'Monet', 3, 3),
('Jackson', 'Pollock', 4, 4),
('Salvador', 'Dalí', 5, 5),
('Henri', 'Matisse', 6, 6),
('Andy', 'Warhol', 7, 7);
