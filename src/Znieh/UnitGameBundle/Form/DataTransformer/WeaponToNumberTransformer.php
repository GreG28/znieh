namespace Znieh\UnitGameBundle\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Doctrine\Common\Persistence\ObjectManager;
use Znieh\UnitGameBundle\Entity\Weapon;

class WeaponToNumberTransformer implements DataTransformerInterface
{
    /**
     * @var ObjectManager
     */
    private $om;

    /**
     * @param ObjectManager $om
     */
    public function __construct(ObjectManager $om)
    {
        $this->om = $om;
    }

    /**
     * Transforms an object (weapon) to a string (number).
     *
     * @param  weapon|null $weapon
     * @return string
     */
    public function transform($weapon)
    {
        if (null === $weapon) {
            return "";
        }

        return $weapon->getId();
    }

    /**
     * Transforms a string (number) to an object (weapon).
     *
     * @param  string $number
     * @return weapon|null
     * @throws TransformationFailedException if object (weapon) is not found.
     */
    public function reverseTransform($number)
    {
        if (!$number) {
            return null;
        }

        $weapon = $this->om
            ->getRepository('AcmeTaskBundle:weapon')
            ->findOneBy(array('number' => $number))
        ;

        if (null === $weapon) {
            throw new TransformationFailedException(sprintf(
                'Le problème avec le numéro "%s" ne peut pas être trouvé!',
                $number
            ));
        }

        return $weapon;
    }
}