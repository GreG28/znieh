<?php
namespace Znieh\UserBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Znieh\UserBundle\Entity\User;

class LoadUserData  extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * Users to save
     */
    private $usersData = array(
              array(
                'username'  => 'admin',
                'role' => 'ROLE_ADMIN',
              ),
              array(
                'username'  => 'test',
                'role' => 'ROLE_USER',
              ),
              array(
                'username'  => 'spyl',
                'role' => 'ROLE_USER',
              ),
              array(
                'username'  => 'darkou',
                'role' => 'ROLE_USER',
              ),
              array(
                'username'  => 'alexian',
                'role' => 'ROLE_USER',
              ),
              array(
                'username'  => 'deker',
                'role' => 'ROLE_USER',
              ),
              array(
                'username'  => 'greg',
                'role' => 'ROLE_USER',
              ),
              array(
                'username'  => 'julie',
                'role' => 'ROLE_USER',
              ),
            );


    /**
     * {@inheritDoc}
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $factory = $this->container->get('security.encoder_factory');

        // Create users
        foreach($this->usersData as $userData) {
            $user = new User();
            $encoder = $factory->getEncoder($user);
            $user
                ->setUsername($userData['username'])
                ->setEmail($userData['username'] .'@zniehgames.com')
                ->setPassword($encoder->encodePassword($userData['username'], $user->getSalt()))
                ->setEnabled(true);
            ;
            $user->addRole($userData['role']);
            $manager->persist($user);
        }
        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 1;
    }
}
