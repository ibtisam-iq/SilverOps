pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner-tool'
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ibtisam-iq/3TierFullStackApp-Flask-Postgres.git'
            }
        }

        stage('Setup Virtual Environment') {
            steps {
                sh '''
                    # Remove any existing virtual environments
                    rm -rf IbtisamX

                    # Create a new virtual environment
                    python3 -m venv IbtisamX

                    # Set permissions
                    chmod -R 755 IbtisamX
                    
                    # The error /var/lib/jenkins/workspace/.../script.sh.copy: 12: source: not found occurs because the source command is not recognized by the shell executing the script.
                    # The source command is a shell built-in command, and it is not available in the shell that is executing the script.
                    # the default shell being used in Jenkins (sh) is not Bash but a more basic shell like dash, which doesn't support source.
                    # To fix this error, you can use the dot (.) command instead of source to activate the virtual environment.

                    # Activate virtual environment and install dependencies
                    . IbtisamX/bin/activate

                    # Upgrade pip package itself using pip
                    pip install --upgrade pip

                    # Install dependencies
                    pip install -r requirements.txt
                '''
                /*
                sh '''
                rm -rf IbtisamX
                python3 -m venv IbtisamX
                chmod -R 755 IbtisamX
                bash -c "
                source IbtisamX/bin/activate
                pip install --upgrade pip
                pip install -r requirements.txt
                "
                '''
                */
            }
        }

        stage('Run Tests - Pytest') {
            steps {
                sh '''
                    # Activate virtual environment and run tests with coverage
                    . IbtisamX/bin/activate

                    # Install coverage package for pytest framework
                    pip install pytest pytest-cov

                    # Run tests with pytest and generate coverage reports
                    pytest --cov=app tests/ --cov-report=xml --cov-report=term-missing --disable-warnings
                '''
            }
        }

        stage('Run Tests - Unittest') {
            steps {
                sh '''
                    # Activate virtual environment and run tests with coverage
                    . IbtisamX/bin/activate

                    # Install coverage package for pytest framework
                    pip install coverage

                    # Run tests with pytest and generate coverage reports
                    coverage run -m unittest discover
                    coverage xml
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh '''
                        $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectKey=Python-project \
                        -Dsonar.projectName=Python-project \
                        -Dsonar.exclusions=IbtisamX/** \
                        -Dsonar.sources=. \
                        -Dsonar.python.coverage.reportPaths=coverage.xml
                    '''
                }
            }
        }
    }

    post {
        always {
            // Clean up the workspace after the build
            cleanWs()
        }
    }
}


/*
Understanding the `pytest` Command

- `pytest`: This is the command to run the `pytest` testing framework.
- `--cov=app`: This option specifies the directory (`app`) for which to measure code coverage.
- `tests/`: This is the directory where your test files are located.
- `--cov-report=xml`: This option generates a coverage report in XML format.
- `--cov-report=term-missing`: This option generates a coverage report in the terminal, showing missing lines of code.
- `--disable-warnings`: This option disables warnings during the test run.

### Summary

- The `pytest` command is included in the `Run Tests` stage.
- It runs tests in the `tests/` directory, measures code coverage for the `app` directory, and generates both XML and terminal coverage reports.
- Warnings are disabled during the test run.

This should ensure that your tests are run with `pytest` and that coverage reports are generated correctly.
*/