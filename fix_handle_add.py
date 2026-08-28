import re

with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

new_handleAddStudent = """  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !surname || !grade || !address || !image) return;

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);

    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${surname.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      surname,
      grade,
      address,
      expiryDate: expiryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      image,
      slug
    };

    try {
      // Save to Firebase Firestore
      await setDoc(doc(db, 'dd_students', slug), {
        ...newStudent,
        createdAt: serverTimestamp()
      });
      
      setStudents(prev => [newStudent, ...prev]);
      setNewlyAddedStudent(newStudent);
      
      // Reset form
      setName('');
      setSurname('');
      setGrade('');
      setAddress('');
      setImage('');
    } catch (error) {
      console.error("Error saving student to database: ", error);
      alert("Failed to save student to database.");
    }
  };"""

content = re.sub(
    r'const handleAddStudent = \(e: React\.FormEvent\) => \{.*?setImage\(\'\'\);\s*\};',
    lambda m: new_handleAddStudent,
    content,
    flags=re.DOTALL
)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)
