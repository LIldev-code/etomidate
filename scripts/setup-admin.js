const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:T9SOZDL4tOxljQ7h@cluster0.vkmmuuo.mongodb.net/?appName=Cluster0";

// Admin Schema
const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', AdminSchema);

async function setupAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'Etomidate-Admin' });
    if (existingAdmin) {
      console.log('Admin user already exists. Updating password...');
      
      // Hash the new password
      const hashedPassword = await bcrypt.hash('Etomidate1234H', 10);
      
      // Update the admin password
      await Admin.updateOne(
        { username: 'Etomidate-Admin' },
        { $set: { password: hashedPassword } }
      );
      
      console.log('✓ Admin password updated successfully');
    } else {
      console.log('Creating new admin user...');
      
      // Hash the password
      const hashedPassword = await bcrypt.hash('Etomidate1234H', 10);
      
      // Create the admin user
      await Admin.create({
        username: 'Etomidate-Admin',
        password: hashedPassword
      });
      
      console.log('✓ Admin user created successfully');
    }

    console.log('\n🎉 Admin setup complete!');
    console.log('Username: Etomidate-Admin');
    console.log('Password: Etomidate1234H');
    console.log('\nYou can now log in at: http://localhost:3000/admin');

  } catch (error) {
    console.error('Error setting up admin:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the setup function
setupAdmin();
