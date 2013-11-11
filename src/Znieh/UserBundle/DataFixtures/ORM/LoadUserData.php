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

        // Create Admin User
        $userAdmin = new User();
        $encoder = $factory->getEncoder($userAdmin);
        $userAdmin
            ->setUsername('admin')
            ->setEmail('admin@zniehgames.com')
            ->setPassword($encoder->encodePassword('admin', $userAdmin->getSalt()))
            ->setEnabled(true);
        ;

        $userAdmin->addRole('ROLE_SUPER_ADMIN');

        $manager->persist($userAdmin);
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
